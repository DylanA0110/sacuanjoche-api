import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    try {
      const nuevoProducto = this.productoRepository.create(createProductoDto);
      await this.productoRepository.save(nuevoProducto);
      return await this.productoRepository.findOne({
        where: { id: nuevoProducto.id },
      });
    } catch (error) {
      handleDbException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.productoRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { id },
    });

    if (!producto)
      throw new NotFoundException(`Producto with id ${id} not found`);

    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.preload({
      id,
      ...updateProductoDto,
    });

    if (!producto) {
      throw new NotFoundException(`Producto with id ${id} not found`);
    }

    return this.productoRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }
}