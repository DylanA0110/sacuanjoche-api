import { ContactoEntregaService } from './contacto-entrega.service';
import { CreateContactoEntregaDto } from './dto/create-contacto-entrega.dto';
import { UpdateContactoEntregaDto } from './dto/update-contacto-entrega.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ContactoEntrega } from './entities/contacto-entrega.entity';
export declare class ContactoEntregaController {
    private readonly contactoEntregaService;
    constructor(contactoEntregaService: ContactoEntregaService);
    create(createContactoEntregaDto: CreateContactoEntregaDto): Promise<ContactoEntrega>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: ContactoEntrega[];
        total: number;
    }>;
    findByTelefono(telefono: string): Promise<ContactoEntrega[]>;
    findOne(id: number): Promise<ContactoEntrega>;
    update(id: number, updateContactoEntregaDto: UpdateContactoEntregaDto): Promise<ContactoEntrega>;
    remove(id: number): Promise<void>;
}
