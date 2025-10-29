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
exports.PedidoHistorialService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pedido_historial_entity_1 = require("./entities/pedido-historial.entity");
let PedidoHistorialService = class PedidoHistorialService {
    pedidoHistorialRepository;
    constructor(pedidoHistorialRepository) {
        this.pedidoHistorialRepository = pedidoHistorialRepository;
    }
    async create(createPedidoHistorialDto) {
        const pedidoHistorial = this.pedidoHistorialRepository.create(createPedidoHistorialDto);
        return await this.pedidoHistorialRepository.save(pedidoHistorial);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.pedidoHistorialRepository.findAndCount({ take: limit, skip: offset, relations: ['pedido', 'empleado'] });
        return { data, total };
    }
    async findOne(id) {
        const pedidoHistorial = await this.pedidoHistorialRepository.findOne({ where: { idPedidoHistorial: id }, relations: ['pedido', 'empleado'] });
        if (!pedidoHistorial)
            throw new common_1.NotFoundException(`Pedido historial con ID ${id} no encontrado`);
        return pedidoHistorial;
    }
    async update(id, updatePedidoHistorialDto) {
        const pedidoHistorial = await this.findOne(id);
        Object.assign(pedidoHistorial, updatePedidoHistorialDto);
        return await this.pedidoHistorialRepository.save(pedidoHistorial);
    }
    async remove(id) {
        const pedidoHistorial = await this.findOne(id);
        await this.pedidoHistorialRepository.remove(pedidoHistorial);
    }
    async findByPedido(idPedido) {
        return await this.pedidoHistorialRepository.find({ where: { idPedido }, relations: ['pedido', 'empleado'], order: { fechaCambio: 'DESC' } });
    }
};
exports.PedidoHistorialService = PedidoHistorialService;
exports.PedidoHistorialService = PedidoHistorialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pedido_historial_entity_1.PedidoHistorial)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PedidoHistorialService);
//# sourceMappingURL=pedido-historial.service.js.map