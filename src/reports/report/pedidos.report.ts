import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { DetallePedido } from '../../detalle-pedido/entities/detalle-pedido.entity';
import { PrinterService } from '../../printer/printer.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { join } from 'path';
import * as fs from 'fs';
import { FindPedidosDto } from '../../pedido/dto/find-pedidos.dto';
import { FindPedidosReporteDto } from '../../pedido/dto/find-pedidos-reporte.dto';

@Injectable()
export class PedidosReport {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    private readonly printerService: PrinterService,
  ) {}

  /**
   * Genera un PDF con el reporte de todos los pedidos
   */
  async generarPDF(filters?: FindPedidosDto): Promise<PDFKit.PDFDocument> {
    // Construir query para obtener todos los pedidos (sin límite para el reporte)
    const qb = this.pedidoRepository
      .createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.empleado', 'empleado')
      .leftJoinAndSelect('pedido.cliente', 'cliente')
      .leftJoinAndSelect('pedido.direccion', 'direccion')
      .leftJoinAndSelect('pedido.contactoEntrega', 'contactoEntrega')
      .leftJoinAndSelect('pedido.pago', 'pago');

    // Aplicar filtros de búsqueda si existen
    if (filters?.q) {
      const search = `%${filters.q}%`;
      qb.andWhere(
        `(
          pedido.direccionTxt ILIKE :search OR
          CAST(pedido.idPedido AS TEXT) ILIKE :search OR
          cliente.primerNombre ILIKE :search OR
          cliente.primerApellido ILIKE :search OR
          empleado.primerNombre ILIKE :search OR
          empleado.primerApellido ILIKE :search OR
          contactoEntrega.nombre ILIKE :search OR
          contactoEntrega.apellido ILIKE :search OR
          contactoEntrega.telefono ILIKE :search
        )`,
        { search },
      );
    }

    // Ordenar por fecha de creación descendente
    qb.orderBy('pedido.fechaCreacion', 'DESC').addOrderBy(
      'pedido.idPedido',
      'DESC',
    );

    const pedidos = await qb.getMany();

    // Cargar el logo
    const logoPath = join(process.cwd(), 'src', 'assets', 'logo-flori.png');
    let logoBase64 = '';
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }

    // Preparar datos para la tabla
    const filasPedidos: any[] = pedidos.map((pedido) => {
      const clienteNombre = pedido.cliente
        ? `${pedido.cliente.primerNombre} ${pedido.cliente.primerApellido}`
        : 'N/A';
      const empleadoNombre = pedido.empleado
        ? `${pedido.empleado.primerNombre} ${pedido.empleado.primerApellido}`
        : 'N/A';
      const fechaCreacion = pedido.fechaCreacion
        ? new Date(pedido.fechaCreacion).toLocaleDateString('es-NI', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : 'N/A';
      const totalPedido = Number(pedido.totalPedido || 0);
      const estadoPago = pedido.pago?.estado || 'Sin pago';

      return [
        {
          text: fechaCreacion,
          alignment: 'center' as const,
          fontSize: 9,
        },
        {
          text: clienteNombre,
          alignment: 'left' as const,
          fontSize: 9,
        },
        {
          text: pedido.estado || 'N/A',
          alignment: 'center' as const,
          fontSize: 9,
        },
        {
          text: pedido.canal || 'N/A',
          alignment: 'center' as const,
          fontSize: 9,
        },
        {
          text: `C$ ${totalPedido.toFixed(2)}`,
          alignment: 'right' as const,
          fontSize: 9,
        },
        {
          text: empleadoNombre,
          alignment: 'left' as const,
          fontSize: 9,
        },
        {
          text: estadoPago,
          alignment: 'center' as const,
          fontSize: 9,
        },
      ];
    });

    // Si no hay pedidos, mostrar mensaje
    if (filasPedidos.length === 0) {
      filasPedidos.push([
        {
          text: 'No hay pedidos para mostrar',
          colSpan: 7,
          alignment: 'center' as const,
          fontSize: 10,
          italics: true,
        },
        {},
        {},
        {},
        {},
        {},
        {},
      ]);
    }

    // Calcular totales
    const totalPedidos = pedidos.length;
    const totalMonto = pedidos.reduce(
      (sum, pedido) => sum + Number(pedido.totalPedido || 0),
      0,
    );

    // Fecha del reporte
    const fechaReporte = new Date().toLocaleDateString('es-NI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

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
                          text: 'Montoya 2 c. al lago 1½ c. abajo',
                          fontSize: 9,
                          margin: [10, 0, 0, 2],
                        },
                        {
                          text: 'Tels: 2222 5776 / 2266 0187',
                          fontSize: 9,
                          margin: [10, 0, 0, 2],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              width: '40%',
              alignment: 'right',
              stack: [
                {
                  text: 'REPORTE DE PEDIDOS',
                  fontSize: 16,
                  bold: true,
                  alignment: 'right',
                  margin: [0, 0, 0, 8],
                  color: '#000000',
                },
                {
                  text: `Fecha: ${fechaReporte}`,
                  fontSize: 10,
                  alignment: 'right',
                  margin: [0, 5, 0, 0],
                },
              ],
            },
          ],
          margin: [0, 0, 0, 20],
        },

        // RESUMEN
        {
          columns: [
            {
              text: `Total de Pedidos: ${totalPedidos}`,
              fontSize: 11,
              bold: true,
              margin: [0, 0, 0, 5],
            },
            {
              text: `Total Monto: C$ ${totalMonto.toFixed(2)}`,
              fontSize: 11,
              bold: true,
              alignment: 'right',
              margin: [0, 0, 0, 5],
            },
          ],
          margin: [0, 0, 0, 15],
        },

        // TABLA DE PEDIDOS
        {
          table: {
            headerRows: 1,
            widths: ['12%', '20%', '14%', '12%', '14%', '18%', '10%'],
            body: [
              // Header de la tabla
              [
                {
                  text: 'FECHA',
                  bold: true,
                  alignment: 'center',
                  fillColor: '#f0f0f0',
                  color: '#000000',
                  fontSize: 9,
                },
                {
                  text: 'CLIENTE',
                  bold: true,
                  fillColor: '#f0f0f0',
                  color: '#000000',
                  fontSize: 9,
                },
                {
                  text: 'ESTADO',
                  bold: true,
                  alignment: 'center',
                  fillColor: '#f0f0f0',
                  color: '#000000',
                  fontSize: 9,
                },
                {
                  text: 'CANAL',
                  bold: true,
                  alignment: 'center',
                  fillColor: '#f0f0f0',
                  color: '#000000',
                  fontSize: 9,
                },
                {
                  text: 'TOTAL',
                  bold: true,
                  alignment: 'right',
                  fillColor: '#f0f0f0',
                  color: '#000000',
                  fontSize: 9,
                },
                {
                  text: 'EMPLEADO',
                  bold: true,
                  fillColor: '#f0f0f0',
                  color: '#000000',
                  fontSize: 9,
                },
                {
                  text: 'ESTADO PAGO',
                  bold: true,
                  alignment: 'center',
                  fillColor: '#f0f0f0',
                  color: '#000000',
                  fontSize: 9,
                },
              ],
              // Filas de pedidos
              ...filasPedidos,
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
              return 0.5;
            },
            hLineColor: function () {
              return '#000000';
            },
            vLineColor: function () {
              return '#000000';
            },
            paddingLeft: function (i) {
              return i === 0 ? 5 : 5;
            },
            paddingRight: function (i, node) {
              return i === node.table.widths!.length - 1 ? 5 : 5;
            },
            paddingTop: function () {
              return 5;
            },
            paddingBottom: function () {
              return 5;
            },
          },
          margin: [0, 0, 0, 20],
        },

        // FOOTER
        {
          text: 'Este reporte fue generado automáticamente por el sistema',
          fontSize: 8,
          italics: true,
          alignment: 'center',
          margin: [0, 20, 0, 0],
          color: '#666666',
        },
      ],
    };

    return this.printerService.createPdf(docDefinition);
  }

  /**
   * Genera un PDF con el reporte de pedidos detallado, incluyendo descripción del pedido y arreglos florales detallados
   */
  async generarPDFDetallado(
    filters?: FindPedidosReporteDto,
  ): Promise<PDFKit.PDFDocument> {
    // Obtener fechas del filtro o usar fecha de hoy por defecto
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaFin = filters?.fechaFin
      ? new Date(filters.fechaFin)
      : new Date(hoy);
    fechaFin.setHours(23, 59, 59, 999);

    const fechaInicio = filters?.fechaInicio
      ? new Date(filters.fechaInicio)
      : new Date(hoy);
    fechaInicio.setHours(0, 0, 0, 0);

    // Construir query para obtener pedidos con todas sus relaciones
    const qb = this.pedidoRepository
      .createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.empleado', 'empleado')
      .leftJoinAndSelect('pedido.cliente', 'cliente')
      .leftJoinAndSelect('pedido.direccion', 'direccion')
      .leftJoinAndSelect('pedido.contactoEntrega', 'contactoEntrega')
      .leftJoinAndSelect('pedido.pago', 'pago')
      .leftJoinAndSelect('pedido.envio', 'envio');

    // Filtrar por rango de fechas (fecha de creación)
    qb.andWhere('pedido.fechaCreacion >= :fechaInicio', {
      fechaInicio: fechaInicio.toISOString(),
    });
    qb.andWhere('pedido.fechaCreacion <= :fechaFin', {
      fechaFin: fechaFin.toISOString(),
    });

    // Ordenar por fecha de creación descendente
    qb.orderBy('pedido.fechaCreacion', 'DESC').addOrderBy(
      'pedido.idPedido',
      'DESC',
    );

    const pedidos = await qb.getMany();

    // Para cada pedido, cargar los detalles con arreglos y sus relaciones
    const pedidosConDetalles = await Promise.all(
      pedidos.map(async (pedido) => {
        const detalles = await this.detallePedidoRepository.find({
          where: { idPedido: pedido.idPedido },
          relations: [
            'arreglo',
            'arreglo.formaArreglo',
            'arreglo.arreglosFlor',
            'arreglo.arreglosFlor.flor',
            'arreglo.accesoriosArreglo',
            'arreglo.accesoriosArreglo.accesorio',
          ],
          order: { idDetallePedido: 'ASC' },
        });
        return { ...pedido, detalles };
      }),
    );

    // Cargar el logo
    const logoPath = join(process.cwd(), 'src', 'assets', 'logo-flori.png');
    let logoBase64 = '';
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }

    // Preparar contenido del reporte
    const contenidoPedidos: any[] = [];

    pedidosConDetalles.forEach((pedido, index) => {
      const clienteNombre = pedido.cliente
        ? `${pedido.cliente.primerNombre} ${pedido.cliente.primerApellido}`
        : 'N/A';
      const empleadoNombre = pedido.empleado
        ? `${pedido.empleado.primerNombre} ${pedido.empleado.primerApellido}`
        : 'N/A';
      const fechaCreacion = pedido.fechaCreacion
        ? new Date(pedido.fechaCreacion).toLocaleDateString('es-NI', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : 'N/A';
      const fechaEntrega = pedido.fechaEntregaEstimada
        ? new Date(pedido.fechaEntregaEstimada).toLocaleDateString('es-NI', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : 'N/A';
      const totalPedido = Number(pedido.totalPedido || 0);
      const totalProductos = Number(pedido.totalProductos || 0);
      const costoEnvio = pedido.envio?.costoEnvio
        ? Number(pedido.envio.costoEnvio)
        : 0;

      // Información del pedido
      contenidoPedidos.push(
        {
          table: {
            widths: ['100%'],
            body: [
              [
                {
                  text: `PEDIDO #${pedido.idPedido} - ${pedido.numeroPedido || 'N/A'}`,
                  bold: true,
                  fontSize: 14,
                  fillColor: '#f0f0f0',
                  color: '#000000',
                  margin: [5, 5, 5, 5],
                },
              ],
            ],
          },
          margin: [0, index === 0 ? 0 : 20, 0, 10],
        },
        {
          columns: [
            {
              width: '50%',
              stack: [
                {
                  text: 'Información del Pedido',
                  bold: true,
                  fontSize: 11,
                  margin: [0, 0, 0, 5],
                },
                {
                  text: `Cliente: ${clienteNombre}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Empleado: ${empleadoNombre}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Fecha Creación: ${fechaCreacion}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Fecha Entrega Estimada: ${fechaEntrega}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Estado: ${pedido.estado || 'N/A'}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Canal: ${pedido.canal || 'N/A'}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
              ],
            },
            {
              width: '50%',
              stack: [
                {
                  text: 'Dirección y Contacto',
                  bold: true,
                  fontSize: 11,
                  margin: [0, 0, 0, 5],
                },
                {
                  text: `Dirección: ${pedido.direccionTxt || 'N/A'}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Contacto: ${pedido.contactoEntrega?.nombre || 'N/A'} ${pedido.contactoEntrega?.apellido || ''}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Teléfono: ${pedido.contactoEntrega?.telefono || 'N/A'}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Total Productos: C$ ${totalProductos.toFixed(2)}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Costo Envío: C$ ${costoEnvio.toFixed(2)}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Total Pedido: C$ ${totalPedido.toFixed(2)}`,
                  fontSize: 10,
                  bold: true,
                  margin: [0, 5, 0, 2],
                },
              ],
            },
          ],
          margin: [0, 0, 0, 10],
        },
      );

      // Arreglos del pedido
      if (pedido.detalles && pedido.detalles.length > 0) {
        contenidoPedidos.push({
          text: 'Arreglos Florales',
          bold: true,
          fontSize: 12,
          margin: [0, 10, 0, 5],
        });

        pedido.detalles.forEach((detalle, detalleIndex) => {
          const arreglo = detalle.arreglo;
          if (!arreglo) return;

          const cantidad = detalle.cantidad;
          const precioUnitario = Number(detalle.precioUnitario || 0);
          const subtotal = Number(detalle.subtotal || 0);

          // Preparar flores
          const flores = arreglo.arreglosFlor || [];
          const listaFlores =
            flores.length > 0
              ? flores.map(
                  (af) =>
                    `• ${af.cantidad}x ${af.flor?.nombre || 'N/A'} (${af.flor?.color || 'N/A'}) - ${af.flor?.tipo || 'N/A'}`,
                )
              : ['• Sin flores asignadas'];

          // Preparar accesorios
          const accesorios = arreglo.accesoriosArreglo || [];
          const listaAccesorios =
            accesorios.length > 0
              ? accesorios.map(
                  (aa) =>
                    `• ${aa.cantidad || 1}x ${aa.accesorio?.descripcion || 'N/A'} (${aa.accesorio?.categoria || 'N/A'})`,
                )
              : ['• Sin accesorios asignados'];

          contenidoPedidos.push(
            {
              table: {
                widths: ['100%'],
                body: [
                  [
                    {
                      text: `${detalleIndex + 1}. ${arreglo.nombre} - Cantidad: ${cantidad}`,
                      bold: true,
                      fontSize: 11,
                      fillColor: '#e8e8e8',
                      color: '#000000',
                      margin: [5, 5, 5, 5],
                    },
                  ],
                ],
              },
              margin: [0, 5, 0, 5],
            },
            {
              columns: [
                {
                  width: '50%',
                  stack: [
                    {
                      text: 'Información del Arreglo',
                      bold: true,
                      fontSize: 10,
                      margin: [0, 0, 0, 3],
                    },
                    {
                      text: `Forma: ${arreglo.formaArreglo?.descripcion || 'N/A'}`,
                      fontSize: 9,
                      margin: [0, 0, 0, 2],
                    },
                    {
                      text: `Precio Unitario: C$ ${precioUnitario.toFixed(2)}`,
                      fontSize: 9,
                      margin: [0, 0, 0, 2],
                    },
                    {
                      text: `Subtotal: C$ ${subtotal.toFixed(2)}`,
                      fontSize: 9,
                      bold: true,
                      margin: [0, 0, 0, 2],
                    },
                    arreglo.descripcion
                      ? {
                          text: `Descripción: ${arreglo.descripcion}`,
                          fontSize: 9,
                          margin: [0, 5, 0, 2],
                          italics: true,
                        }
                      : {},
                  ],
                },
                {
                  width: '50%',
                  stack: [
                    {
                      text: 'Flores',
                      bold: true,
                      fontSize: 10,
                      margin: [0, 0, 0, 3],
                    },
                    {
                      ul: listaFlores,
                      fontSize: 8,
                      margin: [0, 0, 0, 5],
                    },
                    {
                      text: 'Accesorios',
                      bold: true,
                      fontSize: 10,
                      margin: [0, 0, 0, 3],
                    },
                    {
                      ul: listaAccesorios,
                      fontSize: 8,
                      margin: [0, 0, 0, 2],
                    },
                  ],
                },
              ],
              margin: [0, 0, 0, 10],
            },
          );
        });
      } else {
        contenidoPedidos.push({
          text: 'No hay arreglos en este pedido',
          fontSize: 9,
          italics: true,
          margin: [0, 5, 0, 10],
        });
      }
    });

    // Si no hay pedidos, mostrar mensaje
    if (contenidoPedidos.length === 0) {
      contenidoPedidos.push({
        text: 'No hay pedidos para el rango de fechas especificado',
        fontSize: 12,
        italics: true,
        alignment: 'center',
        margin: [0, 20, 0, 20],
      });
    }

    // Calcular totales
    const totalPedidos = pedidosConDetalles.length;
    const totalMonto = pedidosConDetalles.reduce(
      (sum, pedido) => sum + Number(pedido.totalPedido || 0),
      0,
    );

    // Fecha del reporte
    const fechaReporte = new Date().toLocaleDateString('es-NI', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Rango de fechas del reporte
    const fechaInicioStr = fechaInicio.toLocaleDateString('es-NI', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const fechaFinStr = fechaFin.toLocaleDateString('es-NI', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

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
                          text: 'Montoya 2 c. al lago 1½ c. abajo',
                          fontSize: 9,
                          margin: [10, 0, 0, 2],
                        },
                        {
                          text: 'Tels: 2222 5776 / 2266 0187',
                          fontSize: 9,
                          margin: [10, 0, 0, 2],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              width: '40%',
              alignment: 'right',
              stack: [
                {
                  text: 'REPORTE DE PEDIDOS DETALLADO',
                  fontSize: 14,
                  bold: true,
                  alignment: 'right',
                  margin: [0, 0, 0, 5],
                  color: '#000000',
                },
                {
                  text: `Fecha: ${fechaReporte}`,
                  fontSize: 10,
                  alignment: 'right',
                  margin: [0, 2, 0, 0],
                },
                {
                  text: `Rango: ${fechaInicioStr} - ${fechaFinStr}`,
                  fontSize: 9,
                  alignment: 'right',
                  margin: [0, 2, 0, 0],
                },
              ],
            },
          ],
          margin: [0, 0, 0, 20],
        },

        // RESUMEN
        {
          columns: [
            {
              text: `Total de Pedidos: ${totalPedidos}`,
              fontSize: 11,
              bold: true,
              margin: [0, 0, 0, 5],
            },
            {
              text: `Total Monto: C$ ${totalMonto.toFixed(2)}`,
              fontSize: 11,
              bold: true,
              alignment: 'right',
              margin: [0, 0, 0, 5],
            },
          ],
          margin: [0, 0, 0, 15],
        },

        // CONTENIDO DE PEDIDOS
        ...contenidoPedidos,

        // FOOTER
        {
          text: 'Este reporte fue generado automáticamente por el sistema',
          fontSize: 8,
          italics: true,
          alignment: 'center',
          margin: [0, 20, 0, 0],
          color: '#666666',
        },
      ],
    };

    return this.printerService.createPdf(docDefinition);
  }
}

