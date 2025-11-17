import { Injectable } from '@nestjs/common';
import { FacturaReport } from './report/factura.report';
import { OrdenTrabajoReport } from './report/orden-trabajo.report';

@Injectable()
export class ReportsService {
  constructor(
    private readonly facturaReport: FacturaReport,
    private readonly ordenTrabajoReport: OrdenTrabajoReport,
  ) {}

  /**
   * Genera el PDF de una factura en formato exacto según el diseño proporcionado
   */
  async generarFacturaPDF(idFactura: number): Promise<PDFKit.PDFDocument> {
    return this.facturaReport.generarPDF(idFactura);
  }

  /**
   * Genera el PDF de una Orden de Trabajo en formato exacto según el diseño proporcionado
   */
  async generarOrdenTrabajoPDF(idPedido: number): Promise<PDFKit.PDFDocument> {
    return this.ordenTrabajoReport.generarPDF(idPedido);
  }
}
