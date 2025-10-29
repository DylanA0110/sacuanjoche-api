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
exports.ClienteController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cliente_service_1 = require("./cliente.service");
const create_cliente_dto_1 = require("./dto/create-cliente.dto");
const update_cliente_dto_1 = require("./dto/update-cliente.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const cliente_entity_1 = require("./entities/cliente.entity");
let ClienteController = class ClienteController {
    clienteService;
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    create(createClienteDto) {
        return this.clienteService.create(createClienteDto);
    }
    findAll(paginationDto) {
        return this.clienteService.findAll(paginationDto);
    }
    findActiveClients() {
        return this.clienteService.findActiveClients();
    }
    findOne(id) {
        return this.clienteService.findOne(id);
    }
    update(id, updateClienteDto) {
        return this.clienteService.update(id, updateClienteDto);
    }
    remove(id) {
        return this.clienteService.remove(id);
    }
    findByTelefono(telefono) {
        return this.clienteService.findByTelefono(telefono);
    }
};
exports.ClienteController = ClienteController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo cliente' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Cliente creado exitosamente',
        type: cliente_entity_1.Cliente,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los clientes con paginación' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Número de elementos a omitir', example: 0 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de clientes obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Cliente' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ClienteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los clientes activos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de clientes activos obtenida exitosamente',
        type: [cliente_entity_1.Cliente],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClienteController.prototype, "findActiveClients", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un cliente por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del cliente', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente encontrado exitosamente',
        type: cliente_entity_1.Cliente,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cliente no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un cliente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del cliente', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente actualizado exitosamente',
        type: cliente_entity_1.Cliente,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cliente no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_cliente_dto_1.UpdateClienteDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un cliente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del cliente', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cliente no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('telefono/:telefono'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar cliente por teléfono' }),
    (0, swagger_1.ApiParam)({ name: 'telefono', description: 'Número de teléfono del cliente', example: '+1234567890' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente encontrado por teléfono',
        type: cliente_entity_1.Cliente,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cliente no encontrado',
    }),
    __param(0, (0, common_1.Param)('telefono')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClienteController.prototype, "findByTelefono", null);
exports.ClienteController = ClienteController = __decorate([
    (0, swagger_1.ApiTags)('Clientes'),
    (0, common_1.Controller)('cliente'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
//# sourceMappingURL=cliente.controller.js.map