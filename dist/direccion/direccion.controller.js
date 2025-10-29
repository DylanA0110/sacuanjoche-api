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
exports.DireccionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const direccion_service_1 = require("./direccion.service");
const create_direccion_dto_1 = require("./dto/create-direccion.dto");
const update_direccion_dto_1 = require("./dto/update-direccion.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const direccion_entity_1 = require("./entities/direccion.entity");
let DireccionController = class DireccionController {
    direccionService;
    constructor(direccionService) {
        this.direccionService = direccionService;
    }
    create(createDireccionDto) {
        return this.direccionService.create(createDireccionDto);
    }
    findAll(paginationDto) {
        return this.direccionService.findAll(paginationDto);
    }
    findActiveDirecciones() {
        return this.direccionService.findActiveDirecciones();
    }
    findByCity(city) {
        return this.direccionService.findByCity(city);
    }
    findByPostalCode(postalCode) {
        return this.direccionService.findByPostalCode(postalCode);
    }
    findOne(id) {
        return this.direccionService.findOne(id);
    }
    update(id, updateDireccionDto) {
        return this.direccionService.update(id, updateDireccionDto);
    }
    remove(id) {
        return this.direccionService.remove(id);
    }
};
exports.DireccionController = DireccionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva dirección' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Dirección creada exitosamente',
        type: direccion_entity_1.Direccion,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_direccion_dto_1.CreateDireccionDto]),
    __metadata("design:returntype", Promise)
], DireccionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las direcciones con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de direcciones obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Direccion' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], DireccionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las direcciones activas' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de direcciones activas obtenida exitosamente',
        type: [direccion_entity_1.Direccion],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DireccionController.prototype, "findActiveDirecciones", null);
__decorate([
    (0, common_1.Get)('city/:city'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar direcciones por ciudad' }),
    (0, swagger_1.ApiParam)({ name: 'city', description: 'Nombre de la ciudad', example: 'New York' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Direcciones encontradas por ciudad',
        type: [direccion_entity_1.Direccion],
    }),
    __param(0, (0, common_1.Param)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DireccionController.prototype, "findByCity", null);
__decorate([
    (0, common_1.Get)('postal-code/:postalCode'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar direcciones por código postal' }),
    (0, swagger_1.ApiParam)({ name: 'postalCode', description: 'Código postal', example: '10001' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Direcciones encontradas por código postal',
        type: [direccion_entity_1.Direccion],
    }),
    __param(0, (0, common_1.Param)('postalCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DireccionController.prototype, "findByPostalCode", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una dirección por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la dirección', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dirección encontrada exitosamente',
        type: direccion_entity_1.Direccion,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Dirección no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DireccionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una dirección' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la dirección', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dirección actualizada exitosamente',
        type: direccion_entity_1.Direccion,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Dirección no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_direccion_dto_1.UpdateDireccionDto]),
    __metadata("design:returntype", Promise)
], DireccionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una dirección' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la dirección', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dirección eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Dirección no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DireccionController.prototype, "remove", null);
exports.DireccionController = DireccionController = __decorate([
    (0, swagger_1.ApiTags)('Direcciones'),
    (0, common_1.Controller)('direccion'),
    __metadata("design:paramtypes", [direccion_service_1.DireccionService])
], DireccionController);
//# sourceMappingURL=direccion.controller.js.map