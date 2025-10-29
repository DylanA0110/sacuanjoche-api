import { PartialType } from '@nestjs/swagger';
import { CreateArregloDto } from './create-arreglo.dto';

export class UpdateArregloDto extends PartialType(CreateArregloDto) {}


