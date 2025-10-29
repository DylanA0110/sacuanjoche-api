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
exports.ArregloController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const arreglo_service_1 = require("./arreglo.service");
const create_arreglo_dto_1 = require("./dto/create-arreglo.dto");
const update_arreglo_dto_1 = require("./dto/update-arreglo.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const arreglo_entity_1 = require("./entities/arreglo.entity");
let ArregloController = class ArregloController {
    arregloService;
    constructor(arregloService) {
        this.arregloService = arregloService;
    }
    create(createArregloDto) {
        return this.arregloService.create(createArregloDto);
    }
    findAll(paginationDto) {
        return this.arregloService.findAll(paginationDto);
    }
    findActiveArreglos() {
        return this.arregloService.findActiveArreglos();
    }
    findByFormaArreglo(idFormaArreglo) {
        return this.arregloService.findByFormaArreglo(idFormaArreglo);
    }
    findByPriceRange(minPrice, maxPrice) {
        return this.arregloService.findByPriceRange(minPrice, maxPrice);
    }
    findOne(id) {
        return this.arregloService.findOne(id);
    }
    update(id, updateArregloDto) {
        return this.arregloService.update(id, updateArregloDto);
    }
    remove(id) {
        return this.arregloService.remove(id);
    }
};
exports.ArregloController = ArregloController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo arreglo floral' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Arreglo creado exitosamente',
        type: arreglo_entity_1.Arreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_arreglo_dto_1.CreateArregloDto]),
    __metadata("design:returntype", Promise)
], ArregloController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los arreglos con paginación' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Número de elementos a omitir', example: 0 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de arreglos obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Arreglo' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ArregloController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los arreglos activos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de arreglos activos obtenida exitosamente',
        type: [arreglo_entity_1.Arreglo],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArregloController.prototype, "findActiveArreglos", null);
__decorate([
    (0, common_1.Get)('forma/:idFormaArreglo'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar arreglos por forma' }),
    (0, swagger_1.ApiParam)({ name: 'idFormaArreglo', description: 'ID de la forma de arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arreglos encontrados por forma',
        type: [arreglo_entity_1.Arreglo],
    }),
    __param(0, (0, common_1.Param)('idFormaArreglo', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArregloController.prototype, "findByFormaArreglo", null);
__decorate([
    (0, common_1.Get)('price-range'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar arreglos por rango de precio' }),
    (0, swagger_1.ApiQuery)({ name: 'minPrice', description: 'Precio mínimo', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'maxPrice', description: 'Precio máximo', example: 50 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arreglos encontrados en el rango de precio',
        type: [arreglo_entity_1.Arreglo],
    }),
    __param(0, (0, common_1.Query)('minPrice', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('maxPrice', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ArregloController.prototype, "findByPriceRange", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un arreglo por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arreglo encontrado exitosamente',
        type: arreglo_entity_1.Arreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Arreglo no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArregloController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arreglo actualizado exitosamente',
        type: arreglo_entity_1.Arreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Arreglo no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_arreglo_dto_1.UpdateArregloDto]),
    __metadata("design:returntype", Promise)
], ArregloController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arreglo eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Arreglo no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArregloController.prototype, "remove", null);
exports.ArregloController = ArregloController = __decorate([
    (0, swagger_1.ApiTags)('Arreglos'),
    (0, common_1.Controller)('arreglo'),
    __metadata("design:paramtypes", [arreglo_service_1.ArregloService])
], ArregloController);
//# sourceMappingURL=arreglo.controller.js.map