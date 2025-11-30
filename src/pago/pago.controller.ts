import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Headers,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from './entities/pago.entity';
import { FindPagosDto } from './dto/find-pagos.dto';
import { ConfirmPayPalPaymentDto } from './dto/confirm-paypal-payment.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Pagos')
@ApiBearerAuth('JWT-auth')
@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Crear un nuevo pago' })
  @ApiResponse({
    status: 201,
    description: 'Pago creado exitosamente',
    type: Pago,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagoService.create(createPagoDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Obtener todos los pagos con paginación' })
  @ApiQuery({
    name: 'q',
    required: false,
    description:
      'Texto a buscar en estado, referencia, gateway o pedido asociado',
    example: 'Pagado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pagos obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/Pago' },
        },
        total: { type: 'number', description: 'Total de registros' },
      },
    },
  })
  findAll(@Query() filters: FindPagosDto) {
    return this.pagoService.findAll(filters);
  }
  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Obtener un pago por ID' })
  @ApiParam({ name: 'id', description: 'ID del pago', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pago encontrado exitosamente',
    type: Pago,
  })
  @ApiResponse({
    status: 404,
    description: 'Pago no encontrado',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pagoService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Actualizar un pago' })
  @ApiParam({ name: 'id', description: 'ID del pago', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pago actualizado exitosamente',
    type: Pago,
  })
  @ApiResponse({
    status: 404,
    description: 'Pago no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePagoDto: UpdatePagoDto,
  ) {
    return this.pagoService.update(id, updatePagoDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Eliminar un pago' })
  @ApiParam({ name: 'id', description: 'ID del pago', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pago eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Pago no encontrado',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pagoService.remove(id);
  }

  @Post('paypal/create')
  @Auth(ValidRoles.admin, ValidRoles.cliente)
  @ApiOperation({ 
    summary: 'Crear pago con PayPal',
    description: 'Crea un pago con PayPal. El pedido se creará después de confirmar el pago. Este endpoint retorna una URL de aprobación de PayPal que debe usarse para redirigir al usuario.',
  })
  @ApiResponse({
    status: 201,
    description: 'Pago con PayPal creado exitosamente. Retorna la URL de aprobación de PayPal. El pago queda en estado PENDIENTE hasta que se confirme con /paypal/confirm.',
    schema: {
      type: 'object',
      properties: {
        idPago: { type: 'number', description: 'ID del pago creado. Usar este ID para confirmar el pago y luego crear el pedido.' },
        paypalApprovalUrl: { type: 'string', description: 'URL para redirigir al usuario a PayPal para aprobar el pago' },
        estado: { type: 'string', example: 'pendiente' },
        monto: { type: 'number' },
        idGateway: { type: 'string', description: 'ID de la orden de PayPal' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos o error al crear orden en PayPal.',
  })
  createPayPalPayment(@Body() createPagoDto: CreatePagoDto) {
    return this.pagoService.createPayPalPayment(createPagoDto);
  }

  @Post('paypal/confirm/:idPago')
  @Auth(ValidRoles.admin, ValidRoles.cliente)
  @ApiOperation({ 
    summary: 'Confirmar pago de PayPal después de la aprobación',
    description: 'Confirma un pago de PayPal después de que el usuario lo aprueba. Cambia el estado del pago a PAGADO. Después de confirmar, se puede crear el pedido asociado a este pago usando el idPago.',
  })
  @ApiParam({ name: 'idPago', description: 'ID del pago a confirmar (obtenido al crear el pago)', example: 1 })
  @ApiBody({ type: ConfirmPayPalPaymentDto })
  @ApiResponse({
    status: 200,
    description: 'Pago confirmado exitosamente. El pago ahora está en estado PAGADO y puede usarse para crear un pedido.',
    type: Pago,
  })
  @ApiResponse({
    status: 404,
    description: 'Pago no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Pago ya confirmado, orderId no coincide, orderId inválido o error al capturar orden en PayPal',
  })
  confirmPayPalPayment(
    @Param('idPago', ParseIntPipe) idPago: number,
    @Body() confirmDto: ConfirmPayPalPaymentDto,
  ) {
    return this.pagoService.confirmPayPalPayment(idPago, confirmDto.orderId);
  }

  @Post('paypal/webhook')
  @ApiOperation({ summary: 'Webhook de PayPal para notificaciones (público)' })
  @ApiHeader({
    name: 'paypal-transmission-id',
    description: 'ID de transmisión de PayPal',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook recibido exitosamente',
  })
  paypalWebhook(
    @Body() payload: any,
    @Headers('paypal-transmission-id') transmissionId?: string,
  ) {
    return this.pagoService.handlePayPalWebhook(payload);
  }
}
