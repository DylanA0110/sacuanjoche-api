import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactoEntrega } from './entities/contacto-entrega.entity';
import { CreateContactoEntregaDto } from './dto/create-contacto-entrega.dto';
import { UpdateContactoEntregaDto } from './dto/update-contacto-entrega.dto';
import { handleDbException } from 'src/common/helpers/db-exception.helper';
import { FindContactosEntregaDto } from './dto/find-contactos-entrega.dto';

@Injectable()
export class ContactoEntregaService {
  constructor(
    @InjectRepository(ContactoEntrega)
    private readonly contactoEntregaRepository: Repository<ContactoEntrega>,
  ) {}

  async create(createContactoEntregaDto: CreateContactoEntregaDto) {
    try {
      const newContacto = this.contactoEntregaRepository.create({
        ...createContactoEntregaDto,
      });

      await this.contactoEntregaRepository.save(newContacto);

      return newContacto;
    } catch (error) {
      handleDbException(error);
    }
  }

  async findAll(filters: FindContactosEntregaDto) {
    const { limit = 10, offset = 0, q } = filters;

    const qb = this.contactoEntregaRepository.createQueryBuilder('contacto');

    qb.take(limit).skip(offset);

    if (q) {
      const search = `%${q}%`;
      qb.andWhere(
        '(contacto.nombre ILIKE :search OR contacto.apellido ILIKE :search OR contacto.telefono ILIKE :search)',
        { search },
      );
    }

    qb.orderBy('contacto.nombre', 'ASC').addOrderBy('contacto.apellido', 'ASC');

    return qb.getMany();
  }

  async findOne(id: number) {
    const contacto = await this.contactoEntregaRepository.findOneBy({
      idContactoEntrega: id,
    });

    if (!contacto) {
      throw new NotFoundException(
        `El contacto de entrega con id ${id} no fue encontrado`,
      );
    }

    return contacto;
  }

  async update(id: number, updateContactoEntregaDto: UpdateContactoEntregaDto) {
    try {
      const contacto = await this.contactoEntregaRepository.preload({
        idContactoEntrega: id,
        ...updateContactoEntregaDto,
      });

      if (!contacto) {
        throw new NotFoundException(
          `El contacto de entrega con id ${id} no fue encontrado`,
        );
      }

      return this.contactoEntregaRepository.save(contacto);
    } catch (error) {
      handleDbException(error);
    }
  }

  async remove(id: number) {
    const contacto = await this.findOne(id);
    await this.contactoEntregaRepository.remove(contacto);
  }
}
