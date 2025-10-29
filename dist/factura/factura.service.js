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
exports.FacturaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const factura_entity_1 = require("./entities/factura.entity");
let FacturaService = class FacturaService {
    facturaRepository;
    constructor(facturaRepository) {
        this.facturaRepository = facturaRepository;
    }
    async create(createFacturaDto) {
        const factura = this.facturaRepository.create(createFacturaDto);
        return await this.facturaRepository.save(factura);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.facturaRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['pedido', 'empleado'],
        });
        return { data, total };
    }
    async findOne(id) {
        const factura = await this.facturaRepository.findOne({
            where: { idFactura: id },
            relations: ['pedido', 'empleado'],
        });
        if (!factura) {
            throw new common_1.NotFoundException(`Factura con ID ${id} no encontrada`);
        }
        return factura;
    }
    async update(id, updateFacturaDto) {
        const factura = await this.findOne(id);
        Object.assign(factura, updateFacturaDto);
        return await this.facturaRepository.save(factura);
    }
    async remove(id) {
        const factura = await this.findOne(id);
        await this.facturaRepository.remove(factura);
    }
    async findByEstado(estado) {
        return await this.facturaRepository.find({
            where: { estado },
            relations: ['pedido', 'empleado'],
        });
    }
    async findByEmpleado(idEmpleado) {
        return await this.facturaRepository.find({
            where: { idEmpleado },
            relations: ['pedido', 'empleado'],
        });
    }
};
exports.FacturaService = FacturaService;
exports.FacturaService = FacturaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(factura_entity_1.Factura)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FacturaService);
//# sourceMappingURL=factura.service.js.map