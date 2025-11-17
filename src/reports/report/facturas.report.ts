import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from '../../factura/entities/factura.entity';
import { PrinterService } from '../../printer/printer.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { join } from 'path';
import * as fs from 'fs';
import { FindFacturasDto } from '../../factura/dto/find-facturas.dto';

@Injectable()
export class FacturasReport {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    private readonly printerService: PrinterService,
  ) {}

  /**
   * Genera un PDF con el reporte de todas las facturas
   */
  async generarPDF(filters?: FindFacturasDto): Promise<PDFKit.PDFDocument> {
    // Construir query para obtener todas las facturas (sin límite para el reporte)
    const qb = this.facturaRepository
      .createQueryBuilder('factura')
      .leftJoinAndSelect('factura.pedido', 'pedido')
      .leftJoinAndSelect('pedido.cliente', 'cliente')
      .leftJoinAndSelect('factura.empleado', 'empleado');

    // Aplicar filtros de búsqueda si existen
    if (filters?.q) {
      const search = `%${filters.q}%`;
      qb.andWhere(
        '(factura.numFactura ILIKE :search OR factura.estado ILIKE :search OR CAST(pedido.idPedido AS TEXT) ILIKE :search OR empleado.primerNombre ILIKE :search OR empleado.primerApellido ILIKE :search)',
        { search },
      );
    }

    // Ordenar por fecha de emisión descendente
    qb.orderBy('factura.fechaEmision', 'DESC').addOrderBy(
      'factura.idFactura',
      'DESC',
    );

    const facturas = await qb.getMany();

    // Cargar el logo
    const logoPath = join(process.cwd(), 'src', 'assets', 'logo-flori.png');
    let logoBase64 = '';
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }

    // Preparar datos para la tabla
    const filasFacturas: any[] = facturas.map((factura) => {
      const clienteNombre = factura.pedido?.cliente
        ? `${factura.pedido.cliente.primerNombre} ${factura.pedido.cliente.primerApellido}`
        : 'N/A';
      const empleadoNombre = factura.empleado
        ? `${factura.empleado.primerNombre} ${factura.empleado.primerApellido}`
        : 'N/A';
      const fechaEmision = factura.fechaEmision
        ? new Date(factura.fechaEmision).toLocaleDateString('es-NI', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : 'N/A';
      const montoTotal = Number(factura.montoTotal || 0);

      return [
        {
          text: factura.numFactura || 'N/A',
          alignment: 'left' as const,
          fontSize: 9,
        },
        {
          text: fechaEmision,
          alignment: 'center' as const,
          fontSize: 9,
        },
        {
          text: clienteNombre,
          alignment: 'left' as const,
          fontSize: 9,
        },
        {
          text: factura.estado || 'N/A',
          alignment: 'center' as const,
          fontSize: 9,
        },
        {
          text: `C$ ${montoTotal.toFixed(2)}`,
          alignment: 'right' as const,
          fontSize: 9,
        },
        {
          text: empleadoNombre,
          alignment: 'left' as const,
          fontSize: 9,
        },
      ];
    });

    // Si no hay facturas, mostrar mensaje
    if (filasFacturas.length === 0) {
      filasFacturas.push([
        {
          text: 'No hay facturas para mostrar',
          colSpan: 6,
          alignment: 'center' as const,
          fontSize: 10,
          italics: true,
        },
        {},
        {},
        {},
        {},
        {},
      ]);
    }

    // Calcular totales
    const totalFacturas = facturas.length;
    const totalMonto = facturas.reduce(
      (sum, factura) => sum + Number(factura.montoTotal || 0),
      0,
    );

    // Contar facturas por estado
    const facturasPagadas = facturas.filter(
      (f) => f.estado === 'pagado',
    ).length;
    const facturasPendientes = facturas.filter(
      (f) => f.estado === 'pendiente',
    ).length;
    const facturasAnuladas = facturas.filter(
      (f) => f.estado === 'anulada',
    ).length;

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
                  text: 'REPORTE DE FACTURAS',
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
              width: '50%',
              stack: [
                {
                  text: `Total de Facturas: ${totalFacturas}`,
                  fontSize: 11,
                  bold: true,
                  margin: [0, 0, 0, 5],
                },
                {
                  text: `Total Monto: C$ ${totalMonto.toFixed(2)}`,
                  fontSize: 11,
                  bold: true,
                  margin: [0, 0, 0, 5],
                },
              ],
            },
            {
              width: '50%',
              stack: [
                {
                  text: `Pagadas: ${facturasPagadas}`,
                  fontSize: 10,
                  margin: [0, 0, 0, 3],
                },
                {
                  text: `Pendientes: ${facturasPendientes}`,
                  fontSize: 10,
                  margin: [0, 0, 0, 3],
                },
                {
                  text: `Anuladas: ${facturasAnuladas}`,
                  fontSize: 10,
                  margin: [0, 0, 0, 3],
                },
              ],
            },
          ],
          margin: [0, 0, 0, 15],
        },

        // TABLA DE FACTURAS
        {
          table: {
            headerRows: 1,
            widths: ['18%', '12%', '20%', '14%', '14%', '22%'],
            body: [
              // Header de la tabla
              [
                {
                  text: 'N° FACTURA',
                  bold: true,
                  fillColor: '#f0f0f0',
                  color: '#000000',
                  fontSize: 9,
                },
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
                  text: 'MONTO',
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
              ],
              // Filas de facturas
              ...filasFacturas,
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
}

