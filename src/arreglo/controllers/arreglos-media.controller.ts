import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ArregloMediaService } from '../services/arreglo-media.service';
import { CreateArregloMediaSimpleDto } from '../dto/create-arreglo-media-simple.dto';
import { CreateArregloMediaBatchDto } from '../dto/create-arreglo-media-batch.dto';
import { UpdateArregloMediaSupabaseDto } from '../dto/update-arreglo-media-supabase.dto';
import { ArregloMedia } from '../entities/arreglo-media.entity';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiTags('Arreglos Media')
@ApiBearerAuth('JWT-auth')
@Controller('arreglos')
export class ArreglosMediaController {
  constructor(private readonly mediaService: ArregloMediaService) {}

  @Post(':id/media')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Guardar una imagen de Supabase para un arreglo' })
  @ApiParam({ name: 'id', description: 'ID del arreglo', example: 1 })
  @ApiBody({ type: CreateArregloMediaSimpleDto })
  @ApiResponse({
    status: 201,
    description: 'Imagen guardada exitosamente',
    type: ArregloMedia,
  })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateArregloMediaSimpleDto,
  ) {
    return this.mediaService.create(id, dto);
  }

  @Post(':id/media/batch')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Guardar múltiples imágenes de Supabase para un arreglo' })
  @ApiParam({ name: 'id', description: 'ID del arreglo', example: 1 })
  @ApiBody({ type: CreateArregloMediaBatchDto })
  @ApiResponse({
    status: 201,
    description: 'Imágenes guardadas exitosamente',
    type: [ArregloMedia],
  })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  createBatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateArregloMediaBatchDto,
  ) {
    return this.mediaService.createBatch(id, dto);
  }

  @Get(':id/media')
  @Auth(ValidRoles.admin, ValidRoles.vendedor, ValidRoles.cliente)
  @ApiOperation({ summary: 'Obtener todas las imágenes de un arreglo' })
  @ApiParam({ name: 'id', description: 'ID del arreglo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Lista de imágenes obtenida exitosamente',
    type: [ArregloMedia],
  })
  getMedia(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.listByArreglo(id);
  }

  @Patch(':id/media/:mediaId')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Actualizar orden, tipo, isPrimary o altText de una imagen' })
  @ApiParam({ name: 'id', description: 'ID del arreglo', example: 1 })
  @ApiParam({ name: 'mediaId', description: 'ID del registro de media', example: 1 })
  @ApiBody({ type: UpdateArregloMediaSupabaseDto })
  @ApiResponse({
    status: 200,
    description: 'Imagen actualizada exitosamente',
    type: ArregloMedia,
  })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('mediaId', ParseIntPipe) mediaId: number,
    @Body() dto: UpdateArregloMediaSupabaseDto,
  ) {
    return this.mediaService.update(id, mediaId, dto);
  }

  @Delete(':id/media/:mediaId')
  @Auth(ValidRoles.admin, ValidRoles.vendedor)
  @ApiOperation({ summary: 'Eliminar una imagen específica' })
  @ApiParam({ name: 'id', description: 'ID del arreglo', example: 1 })
  @ApiParam({ name: 'mediaId', description: 'ID del registro de media', example: 1 })
  @ApiResponse({
    status: 204,
    description: 'Imagen eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Imagen no encontrada',
  })
  @HttpCode(204)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('mediaId', ParseIntPipe) mediaId: number,
  ) {
    await this.mediaService.delete(id, mediaId);
  }
}

