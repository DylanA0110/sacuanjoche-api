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
exports.PedidoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pedido_service_1 = require("./pedido.service");
const create_pedido_dto_1 = require("./dto/create-pedido.dto");
const update_pedido_dto_1 = require("./dto/update-pedido.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const pedido_entity_1 = require("./entities/pedido.entity");
let PedidoController = class PedidoController {
    pedidoService;
    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }
    create(createPedidoDto) {
        return this.pedidoService.create(createPedidoDto);
    }
    findAll(paginationDto) {
        return this.pedidoService.findAll(paginationDto);
    }
    findByCliente(idCliente) {
        return this.pedidoService.findByCliente(idCliente);
    }
    findByEmpleado(idEmpleado) {
        return this.pedidoService.findByEmpleado(idEmpleado);
    }
    findByDateRange(fechaInicio, fechaFin) {
        return this.pedidoService.findByDateRange(new Date(fechaInicio), new Date(fechaFin));
    }
    findOne(id) {
        return this.pedidoService.findOne(id);
    }
    update(id, updatePedidoDto) {
        return this.pedidoService.update(id, updatePedidoDto);
    }
    remove(id) {
        return this.pedidoService.remove(id);
    }
};
exports.PedidoController = PedidoController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo pedido' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Pedido creado exitosamente',
        type: pedido_entity_1.Pedido,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pedido_dto_1.CreatePedidoDto]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los pedidos con paginación' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Número de elementos a omitir', example: 0 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de pedidos obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Pedido' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('cliente/:idCliente'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pedidos por cliente' }),
    (0, swagger_1.ApiParam)({ name: 'idCliente', description: 'ID del cliente', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedidos encontrados por cliente',
        type: [pedido_entity_1.Pedido],
    }),
    __param(0, (0, common_1.Param)('idCliente', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "findByCliente", null);
__decorate([
    (0, common_1.Get)('empleado/:idEmpleado'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pedidos por empleado' }),
    (0, swagger_1.ApiParam)({ name: 'idEmpleado', description: 'ID del empleado', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedidos encontrados por empleado',
        type: [pedido_entity_1.Pedido],
    }),
    __param(0, (0, common_1.Param)('idEmpleado', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "findByEmpleado", null);
__decorate([
    (0, common_1.Get)('date-range'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pedidos por rango de fechas' }),
    (0, swagger_1.ApiQuery)({ name: 'fechaInicio', description: 'Fecha de inicio', example: '2024-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'fechaFin', description: 'Fecha de fin', example: '2024-01-31' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedidos encontrados en el rango de fechas',
        type: [pedido_entity_1.Pedido],
    }),
    __param(0, (0, common_1.Query)('fechaInicio')),
    __param(1, (0, common_1.Query)('fechaFin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PedidoController.prototype, "findByDateRange", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un pedido por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del pedido', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedido encontrado exitosamente',
        type: pedido_entity_1.Pedido,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pedido no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un pedido' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del pedido', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedido actualizado exitosamente',
        type: pedido_entity_1.Pedido,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pedido no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_pedido_dto_1.UpdatePedidoDto]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un pedido' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del pedido', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedido eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pedido no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "remove", null);
exports.PedidoController = PedidoController = __decorate([
    (0, swagger_1.ApiTags)('Pedidos'),
    (0, common_1.Controller)('pedido'),
    __metadata("design:paramtypes", [pedido_service_1.PedidoService])
], PedidoController);
//# sourceMappingURL=pedido.controller.js.map