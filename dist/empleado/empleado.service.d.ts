import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
export declare class EmpleadoService {
    private readonly empleadoRepository;
    constructor(empleadoRepository: Repository<Empleado>);
    create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Empleado[];
        total: number;
    }>;
    findOne(id: number): Promise<Empleado>;
    update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado>;
    remove(id: number): Promise<void>;
    findActiveEmpleados(): Promise<Empleado[]>;
    findBySexo(sexo: string): Promise<Empleado[]>;
}
