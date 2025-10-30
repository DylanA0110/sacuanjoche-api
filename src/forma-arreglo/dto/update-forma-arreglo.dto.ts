import { PartialType } from '@nestjs/swagger';
import { CreateFormaArregloDto } from './create-forma-arreglo.dto';

export class UpdateFormaArregloDto extends PartialType(CreateFormaArregloDto) {}



