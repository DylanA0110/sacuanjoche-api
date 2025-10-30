import { PartialType } from '@nestjs/swagger';
import { CreateAccesoriosArregloDto } from './create-accesorios-arreglo.dto';

export class UpdateAccesoriosArregloDto extends PartialType(CreateAccesoriosArregloDto) {}



