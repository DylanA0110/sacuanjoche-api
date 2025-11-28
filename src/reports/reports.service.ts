import { Injectable } from '@nestjs/common';
import { FacturaReport } from './report/factura.report';
import { OrdenTrabajoReport } from './report/orden-trabajo.report';
import { PedidosReport } from './report/pedidos.report';
import { FacturasReport } from './report/facturas.report';
import { ArreglosReport } from './report/arreglos.report';
import { FindPedidosDto } from '../pedido/dto/find-pedidos.dto';
import { FindPedidosReporteDto } from '../pedido/dto/find-pedidos-reporte.dto';
import { FindFacturasDto } from '../factura/dto/find-facturas.dto';
import { FindArreglosDto } from '../arreglo/dto/find-arreglos.dto';

@Injectable()
export class ReportsService {
  constructor(
    private readonly facturaReport: FacturaReport,
    private readonly ordenTrabajoReport: OrdenTrabajoReport,
    private readonly pedidosReport: PedidosReport,
    private readonly facturasReport: FacturasReport,
    private readonly arreglosReport: ArreglosReport,
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

  /**
   * Genera un PDF con el reporte de todos los pedidos
   */
  async generarPedidosPDF(
    filters?: FindPedidosDto,
  ): Promise<PDFKit.PDFDocument> {
    return this.pedidosReport.generarPDF(filters);
  }

  /**
   * Genera un PDF con el reporte de todas las facturas
   */
  async generarFacturasPDF(
    filters?: FindFacturasDto,
  ): Promise<PDFKit.PDFDocument> {
    return this.facturasReport.generarPDF(filters);
  }

  /**
   * Genera un PDF con el reporte de todos los arreglos, incluyendo sus flores y accesorios
   */
  async generarArreglosPDF(
    filters?: FindArreglosDto,
  ): Promise<PDFKit.PDFDocument> {
    return this.arreglosReport.generarPDF(filters);
  }

  /**
   * Genera un PDF con el reporte detallado de pedidos, incluyendo descripción del pedido y arreglos florales detallados
   */
  async generarPedidosDetalladoPDF(
    filters?: FindPedidosReporteDto,
  ): Promise<PDFKit.PDFDocument> {
    return this.pedidosReport.generarPDFDetallado(filters);
  }
}
