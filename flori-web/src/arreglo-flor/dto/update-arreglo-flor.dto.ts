import { PartialType } from '@nestjs/swagger';
import { CreateArregloFlorDto } from './create-arreglo-flor.dto';

export class UpdateArregloFlorDto extends PartialType(CreateArregloFlorDto) {}


