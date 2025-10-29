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
exports.ClienteDireccionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cliente_direccion_service_1 = require("./cliente-direccion.service");
const create_cliente_direccion_dto_1 = require("./dto/create-cliente-direccion.dto");
const update_cliente_direccion_dto_1 = require("./dto/update-cliente-direccion.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const cliente_direccion_entity_1 = require("./entities/cliente-direccion.entity");
let ClienteDireccionController = class ClienteDireccionController {
    clienteDireccionService;
    constructor(clienteDireccionService) {
        this.clienteDireccionService = clienteDireccionService;
    }
    create(createClienteDireccionDto) {
        return this.clienteDireccionService.create(createClienteDireccionDto);
    }
    findAll(paginationDto) {
        return this.clienteDireccionService.findAll(paginationDto);
    }
    findByCliente(idCliente) {
        return this.clienteDireccionService.findByCliente(idCliente);
    }
    findPredeterminadaByCliente(idCliente) {
        return this.clienteDireccionService.findPredeterminadaByCliente(idCliente);
    }
    findOne(id) {
        return this.clienteDireccionService.findOne(id);
    }
    update(id, updateClienteDireccionDto) {
        return this.clienteDireccionService.update(id, updateClienteDireccionDto);
    }
    remove(id) {
        return this.clienteDireccionService.remove(id);
    }
};
exports.ClienteDireccionController = ClienteDireccionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva cliente dirección' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Cliente dirección creada exitosamente',
        type: cliente_direccion_entity_1.ClienteDireccion,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_direccion_dto_1.CreateClienteDireccionDto]),
    __metadata("design:returntype", Promise)
], ClienteDireccionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las cliente direcciones con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de cliente direcciones obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/ClienteDireccion' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ClienteDireccionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('cliente/:idCliente'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar cliente direcciones por cliente' }),
    (0, swagger_1.ApiParam)({ name: 'idCliente', description: 'ID del cliente', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente direcciones encontradas por cliente',
        type: [cliente_direccion_entity_1.ClienteDireccion],
    }),
    __param(0, (0, common_1.Param)('idCliente', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClienteDireccionController.prototype, "findByCliente", null);
__decorate([
    (0, common_1.Get)('cliente/:idCliente/predeterminada'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar dirección predeterminada por cliente' }),
    (0, swagger_1.ApiParam)({ name: 'idCliente', description: 'ID del cliente', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dirección predeterminada encontrada por cliente',
        type: cliente_direccion_entity_1.ClienteDireccion,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Dirección predeterminada no encontrada',
    }),
    __param(0, (0, common_1.Param)('idCliente', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClienteDireccionController.prototype, "findPredeterminadaByCliente", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una cliente dirección por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la cliente dirección', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente dirección encontrada exitosamente',
        type: cliente_direccion_entity_1.ClienteDireccion,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cliente dirección no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteDireccionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una cliente dirección' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la cliente dirección', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente dirección actualizada exitosamente',
        type: cliente_direccion_entity_1.ClienteDireccion,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cliente dirección no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_cliente_direccion_dto_1.UpdateClienteDireccionDto]),
    __metadata("design:returntype", Promise)
], ClienteDireccionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una cliente dirección' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la cliente dirección', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente dirección eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cliente dirección no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteDireccionController.prototype, "remove", null);
exports.ClienteDireccionController = ClienteDireccionController = __decorate([
    (0, swagger_1.ApiTags)('Cliente Direcciones'),
    (0, common_1.Controller)('cliente-direccion'),
    __metadata("design:paramtypes", [cliente_direccion_service_1.ClienteDireccionService])
], ClienteDireccionController);
//# sourceMappingURL=cliente-direccion.controller.js.map