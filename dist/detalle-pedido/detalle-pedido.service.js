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
exports.DetallePedidoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const detalle_pedido_entity_1 = require("./entities/detalle-pedido.entity");
let DetallePedidoService = class DetallePedidoService {
    detallePedidoRepository;
    constructor(detallePedidoRepository) {
        this.detallePedidoRepository = detallePedidoRepository;
    }
    async create(createDetallePedidoDto) {
        const detallePedido = this.detallePedidoRepository.create(createDetallePedidoDto);
        return await this.detallePedidoRepository.save(detallePedido);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.detallePedidoRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['pedido', 'arreglo'],
        });
        return { data, total };
    }
    async findOne(id) {
        const detallePedido = await this.detallePedidoRepository.findOne({
            where: { idDetallePedido: id },
            relations: ['pedido', 'arreglo'],
        });
        if (!detallePedido) {
            throw new common_1.NotFoundException(`Detalle pedido con ID ${id} no encontrado`);
        }
        return detallePedido;
    }
    async update(id, updateDetallePedidoDto) {
        const detallePedido = await this.findOne(id);
        Object.assign(detallePedido, updateDetallePedidoDto);
        return await this.detallePedidoRepository.save(detallePedido);
    }
    async remove(id) {
        const detallePedido = await this.findOne(id);
        await this.detallePedidoRepository.remove(detallePedido);
    }
    async findByPedido(idPedido) {
        return await this.detallePedidoRepository.find({
            where: { idPedido },
            relations: ['pedido', 'arreglo'],
        });
    }
};
exports.DetallePedidoService = DetallePedidoService;
exports.DetallePedidoService = DetallePedidoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(detalle_pedido_entity_1.DetallePedido)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DetallePedidoService);
//# sourceMappingURL=detalle-pedido.service.js.map