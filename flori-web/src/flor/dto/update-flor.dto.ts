import { PartialType } from '@nestjs/swagger';
import { CreateFlorDto } from './create-flor.dto';

export class UpdateFlorDto extends PartialType(CreateFlorDto) {}


