import { Repository } from 'typeorm';
import { ContactoEntrega } from './entities/contacto-entrega.entity';
import { CreateContactoEntregaDto } from './dto/create-contacto-entrega.dto';
import { UpdateContactoEntregaDto } from './dto/update-contacto-entrega.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class ContactoEntregaService {
    private readonly contactoEntregaRepository;
    constructor(contactoEntregaRepository: Repository<ContactoEntrega>);
    create(createContactoEntregaDto: CreateContactoEntregaDto): Promise<ContactoEntrega>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: ContactoEntrega[];
        total: number;
    }>;
    findOne(id: number): Promise<ContactoEntrega>;
    update(id: number, updateContactoEntregaDto: UpdateContactoEntregaDto): Promise<ContactoEntrega>;
    remove(id: number): Promise<void>;
    findByTelefono(telefono: string): Promise<ContactoEntrega[]>;
}
