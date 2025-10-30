import { PartialType } from '@nestjs/swagger';
import { CreateContactoEntregaDto } from './create-contacto-entrega.dto';

export class UpdateContactoEntregaDto extends PartialType(CreateContactoEntregaDto) {}



