import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto) {
    try {
      const nuevoRol = this.rolRepository.create(createRolDto);
      await this.rolRepository.save(nuevoRol);
      return await this.rolRepository.findOne({
        where: { idRol: nuevoRol.idRol },
      });
    } catch (error) {
      handleDbException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.rolRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const rol = await this.rolRepository.findOne({
      where: { idRol: id },
    });

    if (!rol)
      throw new NotFoundException(`Rol with id ${id} not found`);

    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    const rol = await this.rolRepository.preload({
      idRol: id,
      ...updateRolDto,
    });

    if (!rol) {
      throw new NotFoundException(`Rol with id ${id} not found`);
    }

    return this.rolRepository.save(rol);
  }

  async remove(id: number) {
    const rol = await this.findOne(id);
    await this.rolRepository.remove(rol);
  }
}
