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
exports.AccesorioController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const accesorio_service_1 = require("./accesorio.service");
const create_accesorio_dto_1 = require("./dto/create-accesorio.dto");
const update_accesorio_dto_1 = require("./dto/update-accesorio.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const accesorio_entity_1 = require("./entities/accesorio.entity");
let AccesorioController = class AccesorioController {
    accesorioService;
    constructor(accesorioService) {
        this.accesorioService = accesorioService;
    }
    create(createAccesorioDto) {
        return this.accesorioService.create(createAccesorioDto);
    }
    findAll(paginationDto) {
        return this.accesorioService.findAll(paginationDto);
    }
    findActiveAccesorios() {
        return this.accesorioService.findActiveAccesorios();
    }
    findByCategoria(categoria) {
        return this.accesorioService.findByCategoria(categoria);
    }
    findOne(id) {
        return this.accesorioService.findOne(id);
    }
    update(id, updateAccesorioDto) {
        return this.accesorioService.update(id, updateAccesorioDto);
    }
    remove(id) {
        return this.accesorioService.remove(id);
    }
};
exports.AccesorioController = AccesorioController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo accesorio' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Accesorio creado exitosamente',
        type: accesorio_entity_1.Accesorio,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_accesorio_dto_1.CreateAccesorioDto]),
    __metadata("design:returntype", Promise)
], AccesorioController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los accesorios con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de accesorios obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Accesorio' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], AccesorioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los accesorios activos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de accesorios activos obtenida exitosamente',
        type: [accesorio_entity_1.Accesorio],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccesorioController.prototype, "findActiveAccesorios", null);
__decorate([
    (0, common_1.Get)('categoria/:categoria'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar accesorios por categoría' }),
    (0, swagger_1.ApiParam)({ name: 'categoria', description: 'Categoría del accesorio', example: 'Decoración' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Accesorios encontrados por categoría',
        type: [accesorio_entity_1.Accesorio],
    }),
    __param(0, (0, common_1.Param)('categoria')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccesorioController.prototype, "findByCategoria", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un accesorio por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del accesorio', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Accesorio encontrado exitosamente',
        type: accesorio_entity_1.Accesorio,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Accesorio no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccesorioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un accesorio' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del accesorio', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Accesorio actualizado exitosamente',
        type: accesorio_entity_1.Accesorio,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Accesorio no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_accesorio_dto_1.UpdateAccesorioDto]),
    __metadata("design:returntype", Promise)
], AccesorioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un accesorio' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del accesorio', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Accesorio eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Accesorio no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccesorioController.prototype, "remove", null);
exports.AccesorioController = AccesorioController = __decorate([
    (0, swagger_1.ApiTags)('Accesorios'),
    (0, common_1.Controller)('accesorio'),
    __metadata("design:paramtypes", [accesorio_service_1.AccesorioService])
], AccesorioController);
//# sourceMappingURL=accesorio.controller.js.map