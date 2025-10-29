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
exports.PagoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pago_entity_1 = require("./entities/pago.entity");
let PagoService = class PagoService {
    pagoRepository;
    constructor(pagoRepository) {
        this.pagoRepository = pagoRepository;
    }
    async create(createPagoDto) {
        const pago = this.pagoRepository.create(createPagoDto);
        return await this.pagoRepository.save(pago);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.pagoRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['pedido', 'metodoPago'],
        });
        return { data, total };
    }
    async findOne(id) {
        const pago = await this.pagoRepository.findOne({
            where: { idPago: id },
            relations: ['pedido', 'metodoPago'],
        });
        if (!pago) {
            throw new common_1.NotFoundException(`Pago con ID ${id} no encontrado`);
        }
        return pago;
    }
    async update(id, updatePagoDto) {
        const pago = await this.findOne(id);
        Object.assign(pago, updatePagoDto);
        return await this.pagoRepository.save(pago);
    }
    async remove(id) {
        const pago = await this.findOne(id);
        await this.pagoRepository.remove(pago);
    }
    async findByEstado(estado) {
        return await this.pagoRepository.find({
            where: { estado },
            relations: ['pedido', 'metodoPago'],
        });
    }
    async findByPedido(idPedido) {
        return await this.pagoRepository.find({
            where: { idPedido },
            relations: ['pedido', 'metodoPago'],
        });
    }
};
exports.PagoService = PagoService;
exports.PagoService = PagoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pago_entity_1.Pago)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PagoService);
//# sourceMappingURL=pago.service.js.map