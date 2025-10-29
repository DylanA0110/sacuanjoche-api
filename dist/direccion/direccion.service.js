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
exports.DireccionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const direccion_entity_1 = require("./entities/direccion.entity");
let DireccionService = class DireccionService {
    direccionRepository;
    constructor(direccionRepository) {
        this.direccionRepository = direccionRepository;
    }
    async create(createDireccionDto) {
        const direccion = this.direccionRepository.create(createDireccionDto);
        return await this.direccionRepository.save(direccion);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.direccionRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['clienteDirecciones', 'pedidos'],
        });
        return { data, total };
    }
    async findOne(id) {
        const direccion = await this.direccionRepository.findOne({
            where: { idDireccion: id },
            relations: ['clienteDirecciones', 'pedidos'],
        });
        if (!direccion) {
            throw new common_1.NotFoundException(`Dirección con ID ${id} no encontrada`);
        }
        return direccion;
    }
    async update(id, updateDireccionDto) {
        const direccion = await this.findOne(id);
        Object.assign(direccion, updateDireccionDto);
        return await this.direccionRepository.save(direccion);
    }
    async remove(id) {
        const direccion = await this.findOne(id);
        await this.direccionRepository.remove(direccion);
    }
    async findByCity(city) {
        return await this.direccionRepository.find({
            where: { city, activo: true },
        });
    }
    async findByPostalCode(postalCode) {
        return await this.direccionRepository.find({
            where: { postalCode, activo: true },
        });
    }
    async findActiveDirecciones() {
        return await this.direccionRepository.find({
            where: { activo: true },
        });
    }
};
exports.DireccionService = DireccionService;
exports.DireccionService = DireccionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(direccion_entity_1.Direccion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DireccionService);
//# sourceMappingURL=direccion.service.js.map