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
exports.CarritoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const carrito_service_1 = require("./carrito.service");
const create_carrito_dto_1 = require("./dto/create-carrito.dto");
const update_carrito_dto_1 = require("./dto/update-carrito.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const carrito_entity_1 = require("./entities/carrito.entity");
let CarritoController = class CarritoController {
    carritoService;
    constructor(carritoService) {
        this.carritoService = carritoService;
    }
    create(createCarritoDto) {
        return this.carritoService.create(createCarritoDto);
    }
    findAll(paginationDto) {
        return this.carritoService.findAll(paginationDto);
    }
    findActiveCarritos() {
        return this.carritoService.findActiveCarritos();
    }
    findByUser(idUser) {
        return this.carritoService.findByUser(idUser);
    }
    findOne(id) {
        return this.carritoService.findOne(id);
    }
    update(id, updateCarritoDto) {
        return this.carritoService.update(id, updateCarritoDto);
    }
    remove(id) {
        return this.carritoService.remove(id);
    }
};
exports.CarritoController = CarritoController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo carrito' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Carrito creado exitosamente',
        type: carrito_entity_1.Carrito,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_carrito_dto_1.CreateCarritoDto]),
    __metadata("design:returntype", Promise)
], CarritoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los carritos con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de carritos obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Carrito' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los carritos activos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de carritos activos obtenida exitosamente',
        type: [carrito_entity_1.Carrito],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "findActiveCarritos", null);
__decorate([
    (0, common_1.Get)('user/:idUser'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar carrito por usuario' }),
    (0, swagger_1.ApiParam)({ name: 'idUser', description: 'ID del usuario', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carrito encontrado por usuario',
        type: carrito_entity_1.Carrito,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Carrito no encontrado',
    }),
    __param(0, (0, common_1.Param)('idUser', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarritoController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un carrito por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del carrito', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carrito encontrado exitosamente',
        type: carrito_entity_1.Carrito,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Carrito no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarritoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un carrito' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del carrito', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carrito actualizado exitosamente',
        type: carrito_entity_1.Carrito,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Carrito no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_carrito_dto_1.UpdateCarritoDto]),
    __metadata("design:returntype", Promise)
], CarritoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un carrito' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del carrito', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carrito eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Carrito no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarritoController.prototype, "remove", null);
exports.CarritoController = CarritoController = __decorate([
    (0, swagger_1.ApiTags)('Carritos'),
    (0, common_1.Controller)('carrito'),
    __metadata("design:paramtypes", [carrito_service_1.CarritoService])
], CarritoController);
//# sourceMappingURL=carrito.controller.js.map