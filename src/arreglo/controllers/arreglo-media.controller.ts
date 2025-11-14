import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ArregloMediaService } from '../services/arreglo-media.service';
import { GenerateUploadUrlDto } from '../dto/generate-upload-url.dto';
import { CreateArregloMediaDto } from '../dto/create-arreglo-media.dto';
import { UpdateArregloMediaDto } from '../dto/update-arreglo-media.dto';
import { ArregloMedia } from '../entities/arreglo-media.entity';

@ApiTags('Arreglos - Media')
@Controller('arreglo')
export class ArregloMediaController {
  constructor(private readonly mediaService: ArregloMediaService) {}

  @Post('media/upload-url')
  @ApiOperation({
    summary:
      'Generar una URL firmada para subir archivos a DigitalOcean Spaces',
  })
  @ApiBody({ type: GenerateUploadUrlDto })
  @ApiResponse({
    status: 201,
    description: 'URL firmada generada correctamente.',
    schema: {
      type: 'object',
      properties: {
        uploadUrl: { type: 'string' },
        expiresAt: { type: 'string', format: 'date-time' },
        objectKey: { type: 'string' },
        publicUrl: { type: 'string' },
      },
    },
  })
  generateUploadUrl(@Body() dto: GenerateUploadUrlDto) {
    return this.mediaService.generateUploadUrl(dto);
  }

  @Get(':id/media')
  @ApiOperation({ summary: 'Listar las imágenes activas de un arreglo' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del arreglo' })
  @ApiResponse({ status: 200, type: ArregloMedia, isArray: true })
  list(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.listByArreglo(id);
  }

  @Post(':id/media')
  @ApiOperation({ summary: 'Registrar una nueva imagen para el arreglo' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del arreglo' })
  @ApiResponse({ status: 201, type: ArregloMedia })
  @ApiBadRequestResponse({ description: 'Datos inválidos' })
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateArregloMediaDto,
  ) {
    return this.mediaService.create(id, dto);
  }

  @Patch(':id/media/:mediaId')
  @ApiOperation({ summary: 'Actualizar los metadatos de una imagen' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del arreglo' })
  @ApiParam({ name: 'mediaId', type: Number, description: 'ID de la imagen' })
  @ApiResponse({ status: 200, type: ArregloMedia })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('mediaId', ParseIntPipe) mediaId: number,
    @Body() dto: UpdateArregloMediaDto,
  ) {
    return this.mediaService.update(id, mediaId, dto);
  }

  @Delete(':id/media/:mediaId')
  @ApiOperation({ summary: 'Desactivar una imagen de la galería' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del arreglo' })
  @ApiParam({ name: 'mediaId', type: Number, description: 'ID de la imagen' })
  @ApiQuery({
    name: 'deleteObject',
    required: false,
    description: 'Elimina también el objeto del almacenamiento remoto',
    schema: { type: 'boolean', default: false },
  })
  @ApiResponse({ status: 204, description: 'Imagen desactivada correctamente' })
  @HttpCode(204)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Param('mediaId', ParseIntPipe) mediaId: number,
    @Query('deleteObject', new ParseBoolPipe({ optional: true }))
    deleteObject?: boolean,
  ) {
    await this.mediaService.deactivate(id, mediaId, { deleteObject });
  }
}
