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
exports.MetodoPagoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const metodo_pago_entity_1 = require("./entities/metodo-pago.entity");
let MetodoPagoService = class MetodoPagoService {
    metodoPagoRepository;
    constructor(metodoPagoRepository) {
        this.metodoPagoRepository = metodoPagoRepository;
    }
    async create(createMetodoPagoDto) {
        const metodoPago = this.metodoPagoRepository.create(createMetodoPagoDto);
        return await this.metodoPagoRepository.save(metodoPago);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.metodoPagoRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['pagos'],
        });
        return { data, total };
    }
    async findOne(id) {
        const metodoPago = await this.metodoPagoRepository.findOne({
            where: { idMetodoPago: id },
            relations: ['pagos'],
        });
        if (!metodoPago) {
            throw new common_1.NotFoundException(`Método de pago con ID ${id} no encontrado`);
        }
        return metodoPago;
    }
    async update(id, updateMetodoPagoDto) {
        const metodoPago = await this.findOne(id);
        Object.assign(metodoPago, updateMetodoPagoDto);
        return await this.metodoPagoRepository.save(metodoPago);
    }
    async remove(id) {
        const metodoPago = await this.findOne(id);
        await this.metodoPagoRepository.remove(metodoPago);
    }
    async findActiveMetodosPago() {
        return await this.metodoPagoRepository.find({
            where: { activo: true },
        });
    }
};
exports.MetodoPagoService = MetodoPagoService;
exports.MetodoPagoService = MetodoPagoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(metodo_pago_entity_1.MetodoPago)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MetodoPagoService);
//# sourceMappingURL=metodo-pago.service.js.map