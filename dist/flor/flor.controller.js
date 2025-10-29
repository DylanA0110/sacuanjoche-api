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
exports.FlorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const flor_service_1 = require("./flor.service");
const create_flor_dto_1 = require("./dto/create-flor.dto");
const update_flor_dto_1 = require("./dto/update-flor.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const flor_entity_1 = require("./entities/flor.entity");
let FlorController = class FlorController {
    florService;
    constructor(florService) {
        this.florService = florService;
    }
    create(createFlorDto) {
        return this.florService.create(createFlorDto);
    }
    findAll(paginationDto) {
        return this.florService.findAll(paginationDto);
    }
    findActiveFlowers() {
        return this.florService.findActiveFlowers();
    }
    findByTipo(tipo) {
        return this.florService.findByTipo(tipo);
    }
    findByColor(color) {
        return this.florService.findByColor(color);
    }
    findOne(id) {
        return this.florService.findOne(id);
    }
    update(id, updateFlorDto) {
        return this.florService.update(id, updateFlorDto);
    }
    remove(id) {
        return this.florService.remove(id);
    }
};
exports.FlorController = FlorController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva flor' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Flor creada exitosamente',
        type: flor_entity_1.Flor,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_flor_dto_1.CreateFlorDto]),
    __metadata("design:returntype", Promise)
], FlorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las flores con paginación' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Número de elementos por página', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'offset', required: false, description: 'Número de elementos a omitir', example: 0 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de flores obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Flor' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], FlorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las flores activas' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de flores activas obtenida exitosamente',
        type: [flor_entity_1.Flor],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlorController.prototype, "findActiveFlowers", null);
__decorate([
    (0, common_1.Get)('tipo/:tipo'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar flores por tipo' }),
    (0, swagger_1.ApiParam)({ name: 'tipo', description: 'Tipo de flor', example: 'Tropical' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Flores encontradas por tipo',
        type: [flor_entity_1.Flor],
    }),
    __param(0, (0, common_1.Param)('tipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlorController.prototype, "findByTipo", null);
__decorate([
    (0, common_1.Get)('color/:color'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar flores por color' }),
    (0, swagger_1.ApiParam)({ name: 'color', description: 'Color de la flor', example: 'Rojo' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Flores encontradas por color',
        type: [flor_entity_1.Flor],
    }),
    __param(0, (0, common_1.Param)('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlorController.prototype, "findByColor", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una flor por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la flor', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Flor encontrada exitosamente',
        type: flor_entity_1.Flor,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Flor no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FlorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una flor' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la flor', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Flor actualizada exitosamente',
        type: flor_entity_1.Flor,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Flor no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_flor_dto_1.UpdateFlorDto]),
    __metadata("design:returntype", Promise)
], FlorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una flor' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la flor', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Flor eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Flor no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FlorController.prototype, "remove", null);
exports.FlorController = FlorController = __decorate([
    (0, swagger_1.ApiTags)('Flores'),
    (0, common_1.Controller)('flor'),
    __metadata("design:paramtypes", [flor_service_1.FlorService])
], FlorController);
//# sourceMappingURL=flor.controller.js.map