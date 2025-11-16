import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrinterService } from '../printer/printer.service';
import { FacturaService } from '../factura/factura.service';
import { PedidoService } from '../pedido/pedido.service';
import { Pedido } from '../pedido/entities/pedido.entity';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class ReportsService {
  constructor(
    private readonly printerService: PrinterService,
    private readonly facturaService: FacturaService,
    private readonly pedidoService: PedidoService,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  /**
   * Genera el PDF de una factura en formato exacto según el diseño proporcionado
   */
  async generarFacturaPDF(idFactura: number): Promise<PDFKit.PDFDocument> {
    // Obtener la factura con todas sus relaciones
    const factura = await this.facturaService.findOne(idFactura);

    if (!factura) {
      throw new NotFoundException(
        `La factura con id ${idFactura} no fue encontrada`,
      );
    }

    // Cargar el logo
    const logoPath = join(process.cwd(), 'src', 'assets', 'logo-flori.png');
    let logoBase64 = '';
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }

    // Formatear fecha
    const fechaEmision = new Date(factura.fechaEmision);
    const fechaFormateada = fechaEmision.toLocaleDateString('es-NI', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // Extraer número de factura (ej: FAC-2024-0001 -> 14651)
    // Si el formato es FAC-YYYY-NNNN, extraer solo el número
    const numFacturaMatch = factura.numFactura.match(/(\d+)$/);
    const numFacturaDisplay = numFacturaMatch
      ? numFacturaMatch[1]
      : factura.numFactura;

    // Datos del cliente desde el pedido
    const cliente = factura.pedido?.cliente;
    const nombreCliente = cliente
      ? `${cliente.primerNombre} ${cliente.primerApellido}`
      : '';

    // Preparar detalles de la factura
    const detalles = factura.detallesFactura || [];
    const filasDetalle: any[] = detalles.map((detalle) => [
      {
        text: detalle.cantidad.toString(),
        alignment: 'center' as const,
        color: '#000000',
      },
      {
        text: detalle.arreglo?.nombre || 'Arreglo',
        alignment: 'left' as const,
        color: '#000000',
      },
      {
        text: `C$ ${Number(detalle.precioUnitario).toFixed(2)}`,
        alignment: 'right' as const,
        color: '#000000',
      },
      {
        text: `C$ ${Number(detalle.subtotal).toFixed(2)}`,
        alignment: 'right' as const,
        color: '#000000',
      },
    ]);

    // Calcular subtotal (suma de todos los detalles)
    const subtotal = detalles.reduce(
      (sum, detalle) => sum + Number(detalle.subtotal || 0),
      0,
    );

    // Transporte (por ahora 0, se puede agregar después)
    const transporte = 0;

    // Total
    const total = Number(factura.montoTotal || subtotal);

    // Definición del documento PDF
    const docDefinition: TDocumentDefinitions = {
      pageSize: 'LETTER',
      pageMargins: [40, 50, 40, 50],
      defaultStyle: {
        font: 'Roboto',
        fontSize: 10,
        color: '#000000',
      },
      content: [
        // HEADER
        {
          columns: [
            // Columna izquierda: Logo y datos de la empresa
            {
              width: '60%',
              stack: [
                {
                  columns: [
                    {
                      image: logoBase64 || '',
                      width: 60,
                      height: 60,
                      fit: [60, 60],
                      margin: [0, 0, 10, 0],
                    },
                    {
                      width: '*',
                      stack: [
                        {
                          text: 'Floristería Sacuanjoche',
                          fontSize: 20,
                          bold: true,
                          margin: [10, 0, 0, 5],
                          color: '#000000',
                        },
                        {
                          text: 'RUC # 0011007820068N',
                          fontSize: 10,
                          margin: [10, 0, 0, 2],
                        },
                        {
                          text: 'Ana Patricia Manzanares C.',
                          fontSize: 11,
                          italics: true,
                          margin: [10, 0, 0, 2],
                        },
                        {
                          text: 'Montoya 2 c. al lago 1½ c. abajo',
                          fontSize: 9,
                          margin: [10, 0, 0, 2],
                        },
                        {
                          text: 'Tels: 2222 5776 / 2266 0187',
                          fontSize: 9,
                          margin: [10, 0, 0, 2],
                        },
                        {
                          text: 'ventas@floristeriasacuanjoche.com',
                          fontSize: 9,
                          margin: [10, 0, 0, 2],
                        },
                        {
                          text: 'Managua, Nicaragua',
                          fontSize: 9,
                          margin: [10, 0, 0, 2],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            // Columna derecha: Título y número de factura
            {
              width: '40%',
              alignment: 'right',
              stack: [
                {
                  text: 'FACTURA DE CONTADO SERIE "A"',
                  fontSize: 11,
                  bold: true,
                  alignment: 'right',
                  margin: [0, 0, 0, 8],
                  color: '#000000',
                },
                {
                  text: `N° ${numFacturaDisplay}`,
                  fontSize: 18,
                  bold: true,
                  color: '#E65100', // Color naranja/rojo similar a la imagen
                  alignment: 'right',
                  margin: [0, 5, 0, 0],
                },
              ],
            },
          ],
          margin: [0, 0, 0, 20],
        },

        // DATOS DEL CLIENTE
        {
          columns: [
            {
              text: `Fecha: ${fechaFormateada}`,
              fontSize: 10,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Sr. (es): ${nombreCliente || '________________'}`,
              fontSize: 10,
              margin: [30, 0, 0, 0],
            },
            {
              text: 'RUC: ________________',
              fontSize: 10,
              margin: [30, 0, 0, 0],
            },
          ],
          margin: [0, 0, 0, 20],
        },

        // TABLA DE DETALLES
        {
          table: {
            headerRows: 1,
            widths: ['15%', '45%', '20%', '20%'],
            body: [
              // Header de la tabla
              [
                {
                  text: 'CANT.',
                  bold: true,
                  alignment: 'center',
                  fillColor: '#f0f0f0',
                  color: '#000000',
                },
                {
                  text: 'DESCRIPCION',
                  bold: true,
                  fillColor: '#f0f0f0',
                  color: '#000000',
                },
                {
                  text: 'P/UNITARIO',
                  bold: true,
                  alignment: 'right',
                  fillColor: '#f0f0f0',
                  color: '#000000',
                },
                {
                  text: 'TOTAL',
                  bold: true,
                  alignment: 'right',
                  fillColor: '#f0f0f0',
                  color: '#000000',
                },
              ],
              // Filas de detalles
              ...filasDetalle,
            ],
          },
          layout: {
            hLineWidth: function (i, node) {
              if (i === 0 || i === 1 || i === node.table.body.length) {
                return 1;
              }
              return 0.5;
            },
            vLineWidth: function () {
              return 1;
            },
            hLineColor: function () {
              return '#000000';
            },
            vLineColor: function () {
              return '#000000';
            },
            paddingLeft: function (i) {
              return i === 0 ? 8 : 10;
            },
            paddingRight: function (i, node) {
              return i === node.table.widths!.length - 1 ? 8 : 10;
            },
            paddingTop: function () {
              return 8;
            },
            paddingBottom: function () {
              return 8;
            },
          },
          margin: [0, 0, 0, 20],
        },

        // FOOTER
        {
          columns: [
            // Columna izquierda: Notas y firmas
            {
              width: '60%',
              stack: [
                {
                  text: 'NOTA: El sello de cancelado no es válido sin firma del colector.',
                  fontSize: 9,
                  italics: true,
                  margin: [0, 0, 0, 12],
                  color: '#000000',
                },
                {
                  text: 'Nuestra Calidad Garantiza su Inversión',
                  fontSize: 11,
                  bold: true,
                  margin: [0, 0, 0, 8],
                  color: '#000000',
                },
                {
                  text: 'GRACIAS POR PREFERIRNOS',
                  fontSize: 12,
                  bold: true,
                  margin: [0, 0, 0, 12],
                  color: '#000000',
                },
                {
                  text:
                    'Elaborar cheque a favor de: ANA PATRICIA MANZANARES C.',
                  fontSize: 9,
                  margin: [0, 0, 0, 15],
                },
                
              ],
            },
            // Columna derecha: Totales
            {
              width: '40%',
              alignment: 'right',
              stack: [
                {
                  table: {
                    widths: ['60%', '40%'],
                    body: [
                      [
                        {
                          text: 'Sub-Total C$',
                          alignment: 'left',
                          fontSize: 10,
                          color: '#000000',
                        },
                        {
                          text: `C$ ${subtotal.toFixed(2)}`,
                          alignment: 'right',
                          fontSize: 10,
                          color: '#000000',
                        },
                      ],
                      [
                        {
                          text: 'Transporte C$',
                          alignment: 'left',
                          fontSize: 10,
                          color: '#000000',
                        },
                        {
                          text: `C$ ${transporte.toFixed(2)}`,
                          alignment: 'right',
                          fontSize: 10,
                          color: '#000000',
                        },
                      ],
                      [
                        {
                          text: 'TOTAL C$',
                          alignment: 'left',
                          fontSize: 11,
                          bold: true,
                          color: '#000000',
                        },
                        {
                          text: `C$ ${total.toFixed(2)}`,
                          alignment: 'right',
                          fontSize: 11,
                          bold: true,
                          color: '#000000',
                        },
                      ],
                    ],
                  },
                  layout: 'noBorders',
                  margin: [0, 0, 0, 10],
                },
                {
                  table: {
                    widths: ['60%', '40%'],
                    body: [
                      [
                        {
                          text: 'CUOTA FIJA',
                          alignment: 'left',
                          fontSize: 10,
                        },
                        {
                          text: '',
                          alignment: 'right',
                          fontSize: 10,
                        },
                      ],
                    ],
                  },
                  layout: 'noBorders',
                },
              ],
            },
          ],
        },
      ],
    };

    return this.printerService.createPdf(docDefinition);
  }

  /**
   * Genera el PDF de una Orden de Trabajo en formato exacto según el diseño proporcionado
   */
  async generarOrdenTrabajoPDF(idPedido: number): Promise<PDFKit.PDFDocument> {
    // Obtener el pedido con todas sus relaciones
    const pedido = await this.pedidoService.findOne(idPedido);

    if (!pedido) {
      throw new NotFoundException(
        `El pedido con id ${idPedido} no fue encontrado`,
      );
    }

    // Cargar relaciones adicionales que no vienen en findOne
    const pedidoCompleto = await this.pedidoRepository.findOne({
      where: { idPedido },
      relations: [
        'empleado',
        'cliente',
        'direccion',
        'contactoEntrega',
        'detallesPedido',
        'detallesPedido.arreglo',
        'pago',
        'pago.metodoPago',
        'factura',
      ],
    });

    if (!pedidoCompleto) {
      throw new NotFoundException(
        `El pedido con id ${idPedido} no fue encontrado`,
      );
    }

    // Cargar el logo
    const logoPath = join(process.cwd(), 'src', 'assets', 'logo-flori.png');
    let logoBase64 = '';
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }

    // Datos de la empresa
    const empresaNombre = 'Floristería Sacuanjoche';
    const empresaDireccion = 'Montoya 2 c. al lago 1½ c. abajo';
    const empresaTelefono = 'Tel: 2222 5776';
    const empresaCiudad = 'Managua, Nicaragua';

    // Datos del pedido
    const direccionEntrega = pedidoCompleto.direccionTxt || pedidoCompleto.direccion?.formattedAddress || '';
    const clienteNombre = pedidoCompleto.cliente
      ? `${pedidoCompleto.cliente.primerNombre} ${pedidoCompleto.cliente.primerApellido}`
      : '';
    const telefonoCliente = pedidoCompleto.cliente?.telefono || pedidoCompleto.contactoEntrega?.telefono || '';
    const telefonoOficina = pedidoCompleto.contactoEntrega?.telefono || '';

    // Arreglos florales
    const detalles = pedidoCompleto.detallesPedido || [];
    const arreglosFlorales = detalles.map((detalle) => {
      const nombreArreglo = detalle.arreglo?.nombre || 'Arreglo';
      const cantidad = detalle.cantidad;
      return `${cantidad}x ${nombreArreglo}`;
    });

    // Datos financieros
    const valor = Number(pedidoCompleto.totalPedido || 0);
    const transporte = 0; // Por ahora 0, se puede agregar después
    const numFactura = pedidoCompleto.factura?.numFactura || '';
    const retencion = 0; // Por ahora 0
    const valorPagado = pedidoCompleto.pago ? Number(pedidoCompleto.pago.monto || 0) : 0;
    const banco = pedidoCompleto.pago?.metodoPago?.descripcion || '';
    const chequeNum = pedidoCompleto.pago?.referencia || '';
    const fechaCobro = pedidoCompleto.pago?.fechaPago
      ? new Date(pedidoCompleto.pago.fechaPago).toLocaleDateString('es-NI')
      : '';
    const efectivo = pedidoCompleto.pago?.estado === 'pagado' ? valorPagado : 0;
    const anticipo = 0; // Por ahora 0
    const fechaCancelacion = '';

    // Fecha de entrega
    const fechaEntrega = pedidoCompleto.fechaEntregaEstimada
      ? new Date(pedidoCompleto.fechaEntregaEstimada).toLocaleDateString('es-NI')
      : '';

    // Definición del documento PDF
    const docDefinition: TDocumentDefinitions = {
      pageSize: 'LETTER',
      pageMargins: [40, 50, 40, 50],
      defaultStyle: {
        font: 'Roboto',
        fontSize: 10,
        color: '#000000',
      },
      content: [
        // HEADER
        {
          columns: [
            {
              image: logoBase64 || '',
              width: 60,
              height: 60,
              fit: [60, 60],
              margin: [0, 0, 0, 0],
            },
            {
              width: '*',
              alignment: 'center',
              stack: [
                {
                  text: empresaNombre,
                  fontSize: 20,
                  bold: true,
                  margin: [0, 0, 0, 5],
                  color: '#000000',
                  alignment: 'center',
                },
                {
                  text: `${empresaDireccion} ${empresaTelefono}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                  alignment: 'center',
                },
                {
                  text: empresaCiudad,
                  fontSize: 9,
                  margin: [0, 0, 0, 10],
                  alignment: 'center',
                },
                {
                  text: 'ORDEN DE TRABAJO',
                  fontSize: 18,
                  bold: true,
                  alignment: 'center',
                  margin: [0, 10, 0, 0],
                },
              ],
            },
            {
              width: 60,
              text: '',
            },
          ],
          margin: [0, 0, 0, 20],
        },

        // ENVIARSE A
        {
          text: 'Enviarse a:',
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 5],
        },
        {
          text: direccionEntrega || '________________',
          fontSize: 10,
          margin: [0, 0, 0, 15],
        },

        // SOLICITADO POR Y TEL OFICINA
        {
          columns: [
            {
              width: '60%',
              stack: [
                {
                  text: 'Solicitado por:',
                  fontSize: 10,
                  bold: true,
                  margin: [0, 0, 0, 5],
                },
                {
                  text: clienteNombre || '________________',
                  fontSize: 10,
                },
              ],
            },
            {
              width: '40%',
              stack: [
                {
                  text: 'Tel Oficina:',
                  fontSize: 10,
                  bold: true,
                  margin: [0, 0, 0, 5],
                },
                {
                  text: telefonoOficina || '________________',
                  fontSize: 10,
                },
              ],
            },
          ],
          margin: [0, 0, 0, 20],
        },

        // ARREGLOS FLORALES
        {
          text: 'ARREGLOS FLORALES:',
          fontSize: 10,
          bold: true,
          margin: [0, 0, 0, 5],
        },
        ...((arreglosFlorales.length > 0
          ? arreglosFlorales.map((arreglo) => ({
              text: arreglo,
              fontSize: 10,
              margin: [0, 0, 0, 3],
            }))
          : [
              {
                text: '________________',
                fontSize: 10,
                margin: [0, 0, 0, 3],
              },
            ]) as any[]),
        {
          text: '',
          fontSize: 10,
          margin: [0, 0, 0, 12],
        },

        // CINTA Y/O TARJETA
        {
          columns: [
            {
              width: '50%',
              stack: [
                {
                  text: 'Cinta y/o Tarjeta:',
                  fontSize: 10,
                  bold: true,
                  margin: [0, 0, 0, 5],
                },
                {
                  text: '________________',
                  fontSize: 10,
                },
              ],
            },
          ],
          margin: [0, 0, 0, 20],
        },

        // DATOS FINANCIEROS
        {
          columns: [
            {
              width: '50%',
              stack: [
                {
                  columns: [
                    {
                      text: 'Valor: C$',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: valor.toFixed(2),
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  columns: [
                    {
                      text: 'Transporte:',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: transporte.toFixed(2),
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  columns: [
                    {
                      text: 'Factura N°',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: numFactura || '________________',
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  columns: [
                    {
                      text: 'Retención C$',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: retencion.toFixed(2),
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  columns: [
                    {
                      text: 'Valor Pagado: C$',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: valorPagado.toFixed(2),
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  columns: [
                    {
                      text: 'Banco:',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: banco || '________________',
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  columns: [
                    {
                      text: 'Cheque N°:',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: chequeNum || '________________',
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  columns: [
                    {
                      text: 'Fecha Cobro:',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: fechaCobro || '________________',
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  columns: [
                    {
                      text: 'Efectivo:',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: efectivo.toFixed(2),
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  columns: [
                    {
                      text: 'Anticipo:',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: anticipo.toFixed(2),
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
                {
                  columns: [
                    {
                      text: 'F/Cancelación:',
                      fontSize: 10,
                      bold: true,
                      width: 'auto',
                    },
                    {
                      text: fechaCancelacion || '________________',
                      fontSize: 10,
                      alignment: 'right',
                      width: '*',
                    },
                  ],
                  margin: [0, 0, 0, 8],
                },
              ],
            },
          ],
          margin: [0, 0, 0, 20],
        },

        // FOOTER
        {
          columns: [
            {
              width: '33%',
              stack: [
                {
                  text: 'Fecha Entrega:',
                  fontSize: 10,
                  bold: true,
                },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 150,
                      y2: 0,
                      lineWidth: 1,
                      lineColor: '#000000',
                    },
                  ],
                  margin: [0, 5, 0, 0],
                },
              ],
            },
            {
              width: '34%',
              alignment: 'center',
              stack: [
                {
                  text: fechaEntrega || '________________',
                  fontSize: 10,
                  alignment: 'center',
                },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 150,
                      y2: 0,
                      lineWidth: 1,
                      lineColor: '#000000',
                    },
                  ],
                  margin: [0, 5, 0, 0],
                  alignment: 'center',
                },
              ],
            },
            {
              width: '33%',
              alignment: 'right',
              stack: [
                {
                  text: 'Recibí Conforme',
                  fontSize: 10,
                  bold: true,
                  alignment: 'right',
                },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0,
                      y1: 0,
                      x2: 150,
                      y2: 0,
                      lineWidth: 1,
                      lineColor: '#000000',
                    },
                  ],
                  margin: [0, 5, 0, 0],
                  alignment: 'right',
                },
              ],
            },
          ],
          margin: [0, 20, 0, 0],
        },
      ],
    };

    return this.printerService.createPdf(docDefinition);
  }
}

