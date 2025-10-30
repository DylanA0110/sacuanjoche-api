import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Envio } from './entities/envio.entity';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { UpdateEnvioDto } from './dto/update-envio.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class EnvioService {
  constructor(@InjectRepository(Envio) private readonly envioRepository: Repository<Envio>) {}

  async create(createEnvioDto: CreateEnvioDto): Promise<Envio> {
    const envio = this.envioRepository.create(createEnvioDto);
    return await this.envioRepository.save(envio);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: Envio[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    const [data, total] = await this.envioRepository.findAndCount({ take: limit, skip: offset, relations: ['pedido', 'empleado'] });
    return { data, total };
  }

  async findOne(id: number): Promise<Envio> {
    const envio = await this.envioRepository.findOne({ where: { idEnvio: id }, relations: ['pedido', 'empleado'] });
    if (!envio) throw new NotFoundException(`Envío con ID ${id} no encontrado`);
    return envio;
  }

  async update(id: number, updateEnvioDto: UpdateEnvioDto): Promise<Envio> {
    const envio = await this.findOne(id);
    Object.assign(envio, updateEnvioDto);
    return await this.envioRepository.save(envio);
  }

  async remove(id: number): Promise<void> {
    const envio = await this.findOne(id);
    await this.envioRepository.remove(envio);
  }

  async findByEstado(estadoEnvio: string): Promise<Envio[]> {
    return await this.envioRepository.find({ where: { estadoEnvio }, relations: ['pedido', 'empleado'] });
  }
}



