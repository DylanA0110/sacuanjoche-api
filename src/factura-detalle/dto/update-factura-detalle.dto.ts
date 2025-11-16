import { PartialType } from '@nestjs/swagger';
import { CreateFacturaDetalleDto } from './create-factura-detalle.dto';

export class UpdateFacturaDetalleDto extends PartialType(CreateFacturaDetalleDto) {}

