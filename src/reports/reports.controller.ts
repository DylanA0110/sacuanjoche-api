import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('factura/:idFactura/pdf')
  @ApiOperation({
    summary: 'Generar PDF de factura',
    description:
      'Genera un PDF de la factura en el formato exacto del diseño proporcionado',
  })
  @ApiParam({
    name: 'idFactura',
    description: 'ID de la factura a generar en PDF',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'PDF generado exitosamente',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Factura no encontrada',
  })
  async generarFacturaPDF(
    @Param('idFactura', ParseIntPipe) idFactura: number,
    @Res() res: Response,
  ) {
    try {
      const pdfDoc = await this.reportsService.generarFacturaPDF(idFactura);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=factura-${idFactura}.pdf`,
      );

      pdfDoc.pipe(res);
      pdfDoc.end();
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al generar el PDF de la factura',
        });
      }
    }
  }

  @Get('pedido/:idPedido/orden-trabajo/pdf')
  @ApiOperation({
    summary: 'Generar PDF de Orden de Trabajo',
    description:
      'Genera un PDF de la Orden de Trabajo del pedido en el formato exacto del diseño proporcionado',
  })
  @ApiParam({
    name: 'idPedido',
    description: 'ID del pedido para generar la Orden de Trabajo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'PDF generado exitosamente',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado',
  })
  async generarOrdenTrabajoPDF(
    @Param('idPedido', ParseIntPipe) idPedido: number,
    @Res() res: Response,
  ) {
    try {
      const pdfDoc = await this.reportsService.generarOrdenTrabajoPDF(idPedido);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=orden-trabajo-${idPedido}.pdf`,
      );

      pdfDoc.pipe(res);
      pdfDoc.end();
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error al generar el PDF de la Orden de Trabajo',
        });
      }
    }
  }
}

