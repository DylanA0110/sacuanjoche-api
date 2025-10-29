import { PartialType } from '@nestjs/swagger';
import { CreateAccesorioDto } from './create-accesorio.dto';

export class UpdateAccesorioDto extends PartialType(CreateAccesorioDto) {}


