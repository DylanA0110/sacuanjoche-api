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
exports.ArregloFlorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const arreglo_flor_service_1 = require("./arreglo-flor.service");
const create_arreglo_flor_dto_1 = require("./dto/create-arreglo-flor.dto");
const update_arreglo_flor_dto_1 = require("./dto/update-arreglo-flor.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const arreglo_flor_entity_1 = require("./entities/arreglo-flor.entity");
let ArregloFlorController = class ArregloFlorController {
    arregloFlorService;
    constructor(arregloFlorService) {
        this.arregloFlorService = arregloFlorService;
    }
    create(createArregloFlorDto) {
        return this.arregloFlorService.create(createArregloFlorDto);
    }
    findAll(paginationDto) {
        return this.arregloFlorService.findAll(paginationDto);
    }
    findByArreglo(idArreglo) {
        return this.arregloFlorService.findByArreglo(idArreglo);
    }
    findByFlor(idFlor) {
        return this.arregloFlorService.findByFlor(idFlor);
    }
    findOne(id) {
        return this.arregloFlorService.findOne(id);
    }
    update(id, updateArregloFlorDto) {
        return this.arregloFlorService.update(id, updateArregloFlorDto);
    }
    remove(id) {
        return this.arregloFlorService.remove(id);
    }
};
exports.ArregloFlorController = ArregloFlorController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva arreglo flor' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Arreglo flor creada exitosamente',
        type: arreglo_flor_entity_1.ArregloFlor,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_arreglo_flor_dto_1.CreateArregloFlorDto]),
    __metadata("design:returntype", Promise)
], ArregloFlorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las arreglo flores con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de arreglo flores obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/ArregloFlor' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ArregloFlorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('arreglo/:idArreglo'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar arreglo flores por arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'idArreglo', description: 'ID del arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arreglo flores encontradas por arreglo',
        type: [arreglo_flor_entity_1.ArregloFlor],
    }),
    __param(0, (0, common_1.Param)('idArreglo', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArregloFlorController.prototype, "findByArreglo", null);
__decorate([
    (0, common_1.Get)('flor/:idFlor'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar arreglo flores por flor' }),
    (0, swagger_1.ApiParam)({ name: 'idFlor', description: 'ID de la flor', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arreglo flores encontradas por flor',
        type: [arreglo_flor_entity_1.ArregloFlor],
    }),
    __param(0, (0, common_1.Param)('idFlor', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArregloFlorController.prototype, "findByFlor", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una arreglo flor por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la arreglo flor', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arreglo flor encontrada exitosamente',
        type: arreglo_flor_entity_1.ArregloFlor,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Arreglo flor no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArregloFlorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una arreglo flor' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la arreglo flor', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arreglo flor actualizada exitosamente',
        type: arreglo_flor_entity_1.ArregloFlor,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Arreglo flor no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_arreglo_flor_dto_1.UpdateArregloFlorDto]),
    __metadata("design:returntype", Promise)
], ArregloFlorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una arreglo flor' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la arreglo flor', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Arreglo flor eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Arreglo flor no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArregloFlorController.prototype, "remove", null);
exports.ArregloFlorController = ArregloFlorController = __decorate([
    (0, swagger_1.ApiTags)('Arreglo Flores'),
    (0, common_1.Controller)('arreglo-flor'),
    __metadata("design:paramtypes", [arreglo_flor_service_1.ArregloFlorService])
], ArregloFlorController);
//# sourceMappingURL=arreglo-flor.controller.js.map