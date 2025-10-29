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
exports.CarritosArregloController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const carritos_arreglo_service_1 = require("./carritos-arreglo.service");
const create_carritos_arreglo_dto_1 = require("./dto/create-carritos-arreglo.dto");
const update_carritos_arreglo_dto_1 = require("./dto/update-carritos-arreglo.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const carritos_arreglo_entity_1 = require("./entities/carritos-arreglo.entity");
let CarritosArregloController = class CarritosArregloController {
    carritosArregloService;
    constructor(carritosArregloService) {
        this.carritosArregloService = carritosArregloService;
    }
    create(createCarritosArregloDto) {
        return this.carritosArregloService.create(createCarritosArregloDto);
    }
    findAll(paginationDto) {
        return this.carritosArregloService.findAll(paginationDto);
    }
    findByCarrito(idCarrito) {
        return this.carritosArregloService.findByCarrito(idCarrito);
    }
    findByArreglo(idArreglo) {
        return this.carritosArregloService.findByArreglo(idArreglo);
    }
    findOne(id) {
        return this.carritosArregloService.findOne(id);
    }
    update(id, updateCarritosArregloDto) {
        return this.carritosArregloService.update(id, updateCarritosArregloDto);
    }
    remove(id) {
        return this.carritosArregloService.remove(id);
    }
};
exports.CarritosArregloController = CarritosArregloController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo carrito arreglo' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Carrito arreglo creado exitosamente',
        type: carritos_arreglo_entity_1.CarritosArreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_carritos_arreglo_dto_1.CreateCarritosArregloDto]),
    __metadata("design:returntype", Promise)
], CarritosArregloController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los carritos arreglos con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de carritos arreglos obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/CarritosArreglo' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], CarritosArregloController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('carrito/:idCarrito'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar carritos arreglos por carrito' }),
    (0, swagger_1.ApiParam)({ name: 'idCarrito', description: 'ID del carrito', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carritos arreglos encontrados por carrito',
        type: [carritos_arreglo_entity_1.CarritosArreglo],
    }),
    __param(0, (0, common_1.Param)('idCarrito', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarritosArregloController.prototype, "findByCarrito", null);
__decorate([
    (0, common_1.Get)('arreglo/:idArreglo'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar carritos arreglos por arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'idArreglo', description: 'ID del arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carritos arreglos encontrados por arreglo',
        type: [carritos_arreglo_entity_1.CarritosArreglo],
    }),
    __param(0, (0, common_1.Param)('idArreglo', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CarritosArregloController.prototype, "findByArreglo", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un carrito arreglo por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del carrito arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carrito arreglo encontrado exitosamente',
        type: carritos_arreglo_entity_1.CarritosArreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Carrito arreglo no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarritosArregloController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un carrito arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del carrito arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carrito arreglo actualizado exitosamente',
        type: carritos_arreglo_entity_1.CarritosArreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Carrito arreglo no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_carritos_arreglo_dto_1.UpdateCarritosArregloDto]),
    __metadata("design:returntype", Promise)
], CarritosArregloController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un carrito arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del carrito arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Carrito arreglo eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Carrito arreglo no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarritosArregloController.prototype, "remove", null);
exports.CarritosArregloController = CarritosArregloController = __decorate([
    (0, swagger_1.ApiTags)('Carritos Arreglos'),
    (0, common_1.Controller)('carritos-arreglo'),
    __metadata("design:paramtypes", [carritos_arreglo_service_1.CarritosArregloService])
], CarritosArregloController);
//# sourceMappingURL=carritos-arreglo.controller.js.map