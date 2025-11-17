import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arreglo } from '../../arreglo/entities/arreglo.entity';
import { PrinterService } from '../../printer/printer.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { join } from 'path';
import * as fs from 'fs';
import { FindArreglosDto } from '../../arreglo/dto/find-arreglos.dto';

@Injectable()
export class ArreglosReport {
  constructor(
    @InjectRepository(Arreglo)
    private readonly arregloRepository: Repository<Arreglo>,
    private readonly printerService: PrinterService,
  ) {}

  /**
   * Genera un PDF con el reporte de todos los arreglos, incluyendo sus flores y accesorios
   */
  async generarPDF(filters?: FindArreglosDto): Promise<PDFKit.PDFDocument> {
    // Construir query para obtener todos los arreglos con sus relaciones
    const qb = this.arregloRepository
      .createQueryBuilder('arreglo')
      .leftJoinAndSelect('arreglo.formaArreglo', 'formaArreglo')
      .leftJoinAndSelect('arreglo.arreglosFlor', 'arreglosFlor')
      .leftJoinAndSelect('arreglosFlor.flor', 'flor')
      .leftJoinAndSelect('arreglo.accesoriosArreglo', 'accesoriosArreglo')
      .leftJoinAndSelect('accesoriosArreglo.accesorio', 'accesorio');

    qb.distinct(true);

    // Aplicar filtros de búsqueda si existen
    if (filters?.q) {
      const search = `%${filters.q}%`;
      qb.andWhere(
        `(arreglo.nombre ILIKE :search OR arreglo.descripcion ILIKE :search OR formaArreglo.descripcion ILIKE :search)`,
        { search },
      );
    }

    // Ordenar por fecha de creación descendente
    qb.orderBy('arreglo.fechaCreacion', 'DESC').addOrderBy(
      'arreglo.idArreglo',
      'DESC',
    );

    const arreglos = await qb.getMany();

    // Cargar el logo
    const logoPath = join(process.cwd(), 'src', 'assets', 'logo-flori.png');
    let logoBase64 = '';
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }

    // Preparar contenido del reporte
    const contenidoArreglos: any[] = [];

    arreglos.forEach((arreglo, index) => {
      // Información del arreglo
      const fechaCreacion = arreglo.fechaCreacion
        ? new Date(arreglo.fechaCreacion).toLocaleDateString('es-NI', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : 'N/A';
      const precioUnitario = Number(arreglo.precioUnitario || 0);
      const formaArreglo = arreglo.formaArreglo?.descripcion || 'N/A';

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
                `• ${aa.cantidad}x ${aa.accesorio?.descripcion || 'N/A'} (${aa.accesorio?.categoria || 'N/A'})`,
            )
          : ['• Sin accesorios asignados'];

      // Agregar sección del arreglo
      contenidoArreglos.push(
        {
          table: {
            widths: ['100%'],
            body: [
              [
                {
                  text: arreglo.nombre,
                  bold: true,
                  fontSize: 12,
                  fillColor: '#f0f0f0',
                  color: '#000000',
                  margin: [5, 5, 5, 5],
                },
              ],
            ],
          },
          margin: [0, index === 0 ? 0 : 15, 0, 10],
        },
        {
          columns: [
            {
              width: '50%',
              stack: [
                {
                  text: 'Información General',
                  bold: true,
                  fontSize: 10,
                  margin: [0, 0, 0, 5],
                },
                {
                  text: `Nombre: ${arreglo.nombre}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Forma: ${formaArreglo}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Precio: C$ ${precioUnitario.toFixed(2)}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Estado: ${arreglo.estado || 'N/A'}`,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                },
                {
                  text: `Fecha Creación: ${fechaCreacion}`,
                  fontSize: 9,
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
                  margin: [0, 0, 0, 5],
                },
                ...listaFlores.map((flor) => ({
                  text: flor,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                })),
                {
                  text: '',
                  fontSize: 9,
                  margin: [0, 5, 0, 0],
                },
                {
                  text: 'Accesorios',
                  bold: true,
                  fontSize: 10,
                  margin: [0, 0, 0, 5],
                },
                ...listaAccesorios.map((accesorio) => ({
                  text: accesorio,
                  fontSize: 9,
                  margin: [0, 0, 0, 2],
                })),
              ],
            },
          ],
          margin: [0, 0, 0, 10],
        },
      );
    });

    // Si no hay arreglos, mostrar mensaje
    if (contenidoArreglos.length === 0) {
      contenidoArreglos.push({
        text: 'No hay arreglos para mostrar',
        fontSize: 12,
        italics: true,
        alignment: 'center',
        margin: [0, 20, 0, 20],
      });
    }

    // Calcular totales
    const totalArreglos = arreglos.length;
    const arreglosActivos = arreglos.filter(
      (a) => a.estado === 'activo',
    ).length;
    const arreglosInactivos = arreglos.filter(
      (a) => a.estado === 'inactivo',
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
                  text: 'REPORTE DE ARREGLOS',
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
              text: `Total de Arreglos: ${totalArreglos}`,
              fontSize: 11,
              bold: true,
              margin: [0, 0, 0, 5],
            },
            {
              text: `Activos: ${arreglosActivos} | Inactivos: ${arreglosInactivos}`,
              fontSize: 10,
              alignment: 'right',
              margin: [0, 0, 0, 5],
            },
          ],
          margin: [0, 0, 0, 15],
        },

        // CONTENIDO DE ARREGLOS
        ...contenidoArreglos,

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

