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
exports.FormaArregloController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const forma_arreglo_service_1 = require("./forma-arreglo.service");
const create_forma_arreglo_dto_1 = require("./dto/create-forma-arreglo.dto");
const update_forma_arreglo_dto_1 = require("./dto/update-forma-arreglo.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const forma_arreglo_entity_1 = require("./entities/forma-arreglo.entity");
let FormaArregloController = class FormaArregloController {
    formaArregloService;
    constructor(formaArregloService) {
        this.formaArregloService = formaArregloService;
    }
    create(createFormaArregloDto) {
        return this.formaArregloService.create(createFormaArregloDto);
    }
    findAll(paginationDto) {
        return this.formaArregloService.findAll(paginationDto);
    }
    findOne(id) {
        return this.formaArregloService.findOne(id);
    }
    update(id, updateFormaArregloDto) {
        return this.formaArregloService.update(id, updateFormaArregloDto);
    }
    remove(id) {
        return this.formaArregloService.remove(id);
    }
};
exports.FormaArregloController = FormaArregloController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva forma de arreglo' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Forma de arreglo creada exitosamente',
        type: forma_arreglo_entity_1.FormaArreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forma_arreglo_dto_1.CreateFormaArregloDto]),
    __metadata("design:returntype", Promise)
], FormaArregloController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las formas de arreglo con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de formas de arreglo obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/FormaArreglo' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], FormaArregloController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una forma de arreglo por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la forma de arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Forma de arreglo encontrada exitosamente',
        type: forma_arreglo_entity_1.FormaArreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Forma de arreglo no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FormaArregloController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una forma de arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la forma de arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Forma de arreglo actualizada exitosamente',
        type: forma_arreglo_entity_1.FormaArreglo,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Forma de arreglo no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_forma_arreglo_dto_1.UpdateFormaArregloDto]),
    __metadata("design:returntype", Promise)
], FormaArregloController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una forma de arreglo' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la forma de arreglo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Forma de arreglo eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Forma de arreglo no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FormaArregloController.prototype, "remove", null);
exports.FormaArregloController = FormaArregloController = __decorate([
    (0, swagger_1.ApiTags)('Formas de Arreglo'),
    (0, common_1.Controller)('forma-arreglo'),
    __metadata("design:paramtypes", [forma_arreglo_service_1.FormaArregloService])
], FormaArregloController);
//# sourceMappingURL=forma-arreglo.controller.js.map