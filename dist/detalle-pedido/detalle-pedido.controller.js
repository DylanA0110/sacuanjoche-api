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
exports.DetallePedidoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const detalle_pedido_service_1 = require("./detalle-pedido.service");
const create_detalle_pedido_dto_1 = require("./dto/create-detalle-pedido.dto");
const update_detalle_pedido_dto_1 = require("./dto/update-detalle-pedido.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const detalle_pedido_entity_1 = require("./entities/detalle-pedido.entity");
let DetallePedidoController = class DetallePedidoController {
    detallePedidoService;
    constructor(detallePedidoService) {
        this.detallePedidoService = detallePedidoService;
    }
    create(createDetallePedidoDto) {
        return this.detallePedidoService.create(createDetallePedidoDto);
    }
    findAll(paginationDto) {
        return this.detallePedidoService.findAll(paginationDto);
    }
    findByPedido(idPedido) {
        return this.detallePedidoService.findByPedido(idPedido);
    }
    findOne(id) {
        return this.detallePedidoService.findOne(id);
    }
    update(id, updateDetallePedidoDto) {
        return this.detallePedidoService.update(id, updateDetallePedidoDto);
    }
    remove(id) {
        return this.detallePedidoService.remove(id);
    }
};
exports.DetallePedidoController = DetallePedidoController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo detalle de pedido' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Detalle pedido creado exitosamente', type: detalle_pedido_entity_1.DetallePedido }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_detalle_pedido_dto_1.CreateDetallePedidoDto]),
    __metadata("design:returntype", Promise)
], DetallePedidoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los detalles de pedido con paginación' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista obtenida exitosamente' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], DetallePedidoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pedido/:idPedido'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar detalles por pedido' }),
    (0, swagger_1.ApiParam)({ name: 'idPedido', description: 'ID del pedido', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalles encontrados', type: [detalle_pedido_entity_1.DetallePedido] }),
    __param(0, (0, common_1.Param)('idPedido', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DetallePedidoController.prototype, "findByPedido", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un detalle pedido por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del detalle pedido', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalle encontrado', type: detalle_pedido_entity_1.DetallePedido }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DetallePedidoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un detalle pedido' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del detalle pedido', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Actualizado exitosamente', type: detalle_pedido_entity_1.DetallePedido }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_detalle_pedido_dto_1.UpdateDetallePedidoDto]),
    __metadata("design:returntype", Promise)
], DetallePedidoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un detalle pedido' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del detalle pedido', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Eliminado exitosamente' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DetallePedidoController.prototype, "remove", null);
exports.DetallePedidoController = DetallePedidoController = __decorate([
    (0, swagger_1.ApiTags)('Detalle Pedidos'),
    (0, common_1.Controller)('detalle-pedido'),
    __metadata("design:paramtypes", [detalle_pedido_service_1.DetallePedidoService])
], DetallePedidoController);
//# sourceMappingURL=detalle-pedido.controller.js.map