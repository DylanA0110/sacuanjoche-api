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
exports.AccesoriosArregloController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const accesorios_arreglo_service_1 = require("./accesorios-arreglo.service");
const create_accesorios_arreglo_dto_1 = require("./dto/create-accesorios-arreglo.dto");
const update_accesorios_arreglo_dto_1 = require("./dto/update-accesorios-arreglo.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const accesorios_arreglo_entity_1 = require("./entities/accesorios-arreglo.entity");
let AccesoriosArregloController = class AccesoriosArregloController {
    accesoriosArregloService;
    constructor(accesoriosArregloService) {
        this.accesoriosArregloService = accesoriosArregloService;
    }
    create(createAccesoriosArregloDto) {
        return this.accesoriosArregloService.create(createAccesoriosArregloDto);
    }
    findAll(paginationDto) {
        return this.accesoriosArregloService.findAll(paginationDto);
    }
    findByAccesorio(idAccesorio) {
        return this.accesoriosArregloService.findByAccesorio(idAccesorio);
    }
    findByArreglo(idArreglo) {
        return this.accesoriosArregloService.findByArreglo(idArreglo);
    }
    findOne(id) {
        return this.accesoriosArregloService.findOne(id);
    }
    update(id, updateAccesoriosArregloDto) {
        return this.accesoriosArregloService.update(id, updateAccesoriosArregloDto);
    }
    remove(id) {
        return this.accesoriosArregloService.remove(id);
    }
};
exports.AccesoriosArregloController = AccesoriosArregloController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva accesorios arreglo' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Accesorios arreglo creada exitosamente',
        type: accesorios_arreglo_entity_1.AccesoriosArreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_accesorios_arreglo_dto_1.CreateAccesoriosArregloDto]),
    __metadata("design:returntype", Promise)
], AccesoriosArregloController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las accesorios arreglos con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de accesorios arreglos obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/AccesoriosArreglo' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], AccesoriosArregloController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('accesorio/:idAccesorio'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar accesorios arreglos por accesorio' }),
    (0, swagger_1.ApiParam)({ name: 'idAccesorio', description: 'ID del accesorio', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Accesorios arreglos encontrados por accesorio',
        type: [accesorios_arreglo_entity_1.AccesoriosArreglo],
    }),
    __param(0, (0, common_1.Param)('idAccesorio', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AccesoriosArregloController.prototype, "findByAccesorio", null);
__decorate([
    (0, common_1.Get)('arreglo/:idArreglo'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar accesorios arreglos por arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'idArreglo', description: 'ID del arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Accesorios arreglos encontrados por arreglo',
        type: [accesorios_arreglo_entity_1.AccesoriosArreglo],
    }),
    __param(0, (0, common_1.Param)('idArreglo', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AccesoriosArregloController.prototype, "findByArreglo", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una accesorios arreglo por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la accesorios arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Accesorios arreglo encontrada exitosamente',
        type: accesorios_arreglo_entity_1.AccesoriosArreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Accesorios arreglo no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccesoriosArregloController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una accesorios arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la accesorios arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Accesorios arreglo actualizada exitosamente',
        type: accesorios_arreglo_entity_1.AccesoriosArreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Accesorios arreglo no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_accesorios_arreglo_dto_1.UpdateAccesoriosArregloDto]),
    __metadata("design:returntype", Promise)
], AccesoriosArregloController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una accesorios arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la accesorios arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Accesorios arreglo eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Accesorios arreglo no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccesoriosArregloController.prototype, "remove", null);
exports.AccesoriosArregloController = AccesoriosArregloController = __decorate([
    (0, swagger_1.ApiTags)('Accesorios Arreglos'),
    (0, common_1.Controller)('accesorios-arreglo'),
    __metadata("design:paramtypes", [accesorios_arreglo_service_1.AccesoriosArregloService])
], AccesoriosArregloController);
//# sourceMappingURL=accesorios-arreglo.controller.js.map