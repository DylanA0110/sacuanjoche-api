import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactoEntrega } from './entities/contacto-entrega.entity';
import { CreateContactoEntregaDto } from './dto/create-contacto-entrega.dto';
import { UpdateContactoEntregaDto } from './dto/update-contacto-entrega.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ContactoEntregaService {
  constructor(
    @InjectRepository(ContactoEntrega)
    private readonly contactoEntregaRepository: Repository<ContactoEntrega>,
  ) {}

  async create(createContactoEntregaDto: CreateContactoEntregaDto): Promise<ContactoEntrega> {
    const contactoEntrega = this.contactoEntregaRepository.create(createContactoEntregaDto);
    return await this.contactoEntregaRepository.save(contactoEntrega);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: ContactoEntrega[]; total: number }> {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [data, total] = await this.contactoEntregaRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['pedidos'],
    });

    return { data, total };
  }

  async findOne(id: number): Promise<ContactoEntrega> {
    const contactoEntrega = await this.contactoEntregaRepository.findOne({
      where: { idContactoEntrega: id },
      relations: ['pedidos'],
    });

    if (!contactoEntrega) {
      throw new NotFoundException(`Contacto de entrega con ID ${id} no encontrado`);
    }

    return contactoEntrega;
  }

  async update(id: number, updateContactoEntregaDto: UpdateContactoEntregaDto): Promise<ContactoEntrega> {
    const contactoEntrega = await this.findOne(id);
    
    Object.assign(contactoEntrega, updateContactoEntregaDto);
    return await this.contactoEntregaRepository.save(contactoEntrega);
  }

  async remove(id: number): Promise<void> {
    const contactoEntrega = await this.findOne(id);
    await this.contactoEntregaRepository.remove(contactoEntrega);
  }

  async findByTelefono(telefono: string): Promise<ContactoEntrega[]> {
    return await this.contactoEntregaRepository.find({
      where: { telefono },
      relations: ['pedidos'],
    });
  }
}



