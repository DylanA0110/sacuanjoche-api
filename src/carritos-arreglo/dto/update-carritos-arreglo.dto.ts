import { PartialType } from '@nestjs/swagger';
import { CreateCarritosArregloDto } from './create-carritos-arreglo.dto';

export class UpdateCarritosArregloDto extends PartialType(CreateCarritosArregloDto) {}



