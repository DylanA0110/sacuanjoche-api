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
exports.PedidoHistorialController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pedido_historial_service_1 = require("./pedido-historial.service");
const create_pedido_historial_dto_1 = require("./dto/create-pedido-historial.dto");
const update_pedido_historial_dto_1 = require("./dto/update-pedido-historial.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const pedido_historial_entity_1 = require("./entities/pedido-historial.entity");
let PedidoHistorialController = class PedidoHistorialController {
    pedidoHistorialService;
    constructor(pedidoHistorialService) {
        this.pedidoHistorialService = pedidoHistorialService;
    }
    create(createPedidoHistorialDto) {
        return this.pedidoHistorialService.create(createPedidoHistorialDto);
    }
    findAll(paginationDto) {
        return this.pedidoHistorialService.findAll(paginationDto);
    }
    findByPedido(idPedido) {
        return this.pedidoHistorialService.findByPedido(idPedido);
    }
    findOne(id) {
        return this.pedidoHistorialService.findOne(id);
    }
    update(id, updatePedidoHistorialDto) {
        return this.pedidoHistorialService.update(id, updatePedidoHistorialDto);
    }
    remove(id) {
        return this.pedidoHistorialService.remove(id);
    }
};
exports.PedidoHistorialController = PedidoHistorialController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo historial de pedido' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Historial creado exitosamente', type: pedido_historial_entity_1.PedidoHistorial }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pedido_historial_dto_1.CreatePedidoHistorialDto]),
    __metadata("design:returntype", Promise)
], PedidoHistorialController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los historiales con paginación' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista obtenida exitosamente' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PedidoHistorialController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pedido/:idPedido'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar historiales por pedido' }),
    (0, swagger_1.ApiParam)({ name: 'idPedido', description: 'ID del pedido', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historiales encontrados', type: [pedido_historial_entity_1.PedidoHistorial] }),
    __param(0, (0, common_1.Param)('idPedido', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PedidoHistorialController.prototype, "findByPedido", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un historial por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del historial', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historial encontrado', type: pedido_historial_entity_1.PedidoHistorial }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidoHistorialController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un historial' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del historial', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Actualizado exitosamente', type: pedido_historial_entity_1.PedidoHistorial }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_pedido_historial_dto_1.UpdatePedidoHistorialDto]),
    __metadata("design:returntype", Promise)
], PedidoHistorialController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un historial' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del historial', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Eliminado exitosamente' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidoHistorialController.prototype, "remove", null);
exports.PedidoHistorialController = PedidoHistorialController = __decorate([
    (0, swagger_1.ApiTags)('Pedido Historial'),
    (0, common_1.Controller)('pedido-historial'),
    __metadata("design:paramtypes", [pedido_historial_service_1.PedidoHistorialService])
], PedidoHistorialController);
//# sourceMappingURL=pedido-historial.controller.js.map