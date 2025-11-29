import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacturaService } from '../../factura/factura.service';
import { PrinterService } from '../../printer/printer.service';
import { Factura } from '../../factura/entities/factura.entity';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class FacturaReport {
  constructor(
    private readonly facturaService: FacturaService,
    private readonly printerService: PrinterService,
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
  ) {}

  /**
   * Genera el PDF de una factura en formato exacto según el diseño proporcionado
   */
  async generarPDF(idFactura: number): Promise<PDFKit.PDFDocument> {
    // Obtener la factura con todas sus relaciones, incluyendo pedido.envio
    const factura = await this.facturaRepository.findOne({
      where: { idFactura },
      relations: [
        'pedido',
        'pedido.cliente',
        'pedido.envio',
        'empleado',
        'detallesFactura',
        'detallesFactura.arreglo',
      ],
    });

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

    // Transporte (obtenido de la tabla envio)
    const transporte = factura.pedido?.envio?.costoEnvio
      ? Number(factura.pedido.envio.costoEnvio)
      : 0;

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
}

