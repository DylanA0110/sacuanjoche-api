"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const empleado_entity_1 = require("./entities/empleado.entity");
let EmpleadoService = class EmpleadoService {
    empleadoRepository;
    constructor(empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }
    async create(createEmpleadoDto) {
        const empleado = this.empleadoRepository.create(createEmpleadoDto);
        return await this.empleadoRepository.save(empleado);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.empleadoRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['pedidos', 'envios', 'facturas', 'users', 'pedidosHistorial'],
        });
        return { data, total };
    }
    async findOne(id) {
        const empleado = await this.empleadoRepository.findOne({
            where: { idEmpleado: id },
            relations: ['pedidos', 'envios', 'facturas', 'users', 'pedidosHistorial'],
        });
        if (!empleado) {
            throw new common_1.NotFoundException(`Empleado con ID ${id} no encontrado`);
        }
        return empleado;
    }
    async update(id, updateEmpleadoDto) {
        const empleado = await this.findOne(id);
        Object.assign(empleado, updateEmpleadoDto);
        return await this.empleadoRepository.save(empleado);
    }
    async remove(id) {
        const empleado = await this.findOne(id);
        await this.empleadoRepository.remove(empleado);
    }
    async findActiveEmpleados() {
        return await this.empleadoRepository.find({
            where: { activo: true },
        });
    }
    async findBySexo(sexo) {
        return await this.empleadoRepository.find({
            where: { sexo, activo: true },
        });
    }
};
exports.EmpleadoService = EmpleadoService;
exports.EmpleadoService = EmpleadoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(empleado_entity_1.Empleado)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmpleadoService);
//# sourceMappingURL=empleado.service.js.map