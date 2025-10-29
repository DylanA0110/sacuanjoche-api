import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Empleado } from './entities/empleado.entity';
export declare class EmpleadoController {
    private readonly empleadoService;
    constructor(empleadoService: EmpleadoService);
    create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Empleado[];
        total: number;
    }>;
    findActiveEmpleados(): Promise<Empleado[]>;
    findBySexo(sexo: string): Promise<Empleado[]>;
    findOne(id: number): Promise<Empleado>;
    update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado>;
    remove(id: number): Promise<void>;
}
