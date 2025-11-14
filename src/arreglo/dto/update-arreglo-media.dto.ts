import { PartialType } from '@nestjs/swagger';
import { CreateArregloMediaDto } from './create-arreglo-media.dto';

export class UpdateArregloMediaDto extends PartialType(CreateArregloMediaDto) {}
