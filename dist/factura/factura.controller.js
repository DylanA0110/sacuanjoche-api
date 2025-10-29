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
exports.FacturaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const factura_service_1 = require("./factura.service");
const create_factura_dto_1 = require("./dto/create-factura.dto");
const update_factura_dto_1 = require("./dto/update-factura.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const factura_entity_1 = require("./entities/factura.entity");
let FacturaController = class FacturaController {
    facturaService;
    constructor(facturaService) {
        this.facturaService = facturaService;
    }
    create(createFacturaDto) {
        return this.facturaService.create(createFacturaDto);
    }
    findAll(paginationDto) {
        return this.facturaService.findAll(paginationDto);
    }
    findByEstado(estado) {
        return this.facturaService.findByEstado(estado);
    }
    findByEmpleado(idEmpleado) {
        return this.facturaService.findByEmpleado(idEmpleado);
    }
    findOne(id) {
        return this.facturaService.findOne(id);
    }
    update(id, updateFacturaDto) {
        return this.facturaService.update(id, updateFacturaDto);
    }
    remove(id) {
        return this.facturaService.remove(id);
    }
};
exports.FacturaController = FacturaController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear una nueva factura' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Factura creada exitosamente',
        type: factura_entity_1.Factura,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_factura_dto_1.CreateFacturaDto]),
    __metadata("design:returntype", Promise)
], FacturaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las facturas con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de facturas obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Factura' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], FacturaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('estado/:estado'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar facturas por estado' }),
    (0, swagger_1.ApiParam)({ name: 'estado', description: 'Estado de la factura', example: 'Emitida' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Facturas encontradas por estado',
        type: [factura_entity_1.Factura],
    }),
    __param(0, (0, common_1.Param)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FacturaController.prototype, "findByEstado", null);
__decorate([
    (0, common_1.Get)('empleado/:idEmpleado'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar facturas por empleado' }),
    (0, swagger_1.ApiParam)({ name: 'idEmpleado', description: 'ID del empleado', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Facturas encontradas por empleado',
        type: [factura_entity_1.Factura],
    }),
    __param(0, (0, common_1.Param)('idEmpleado', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FacturaController.prototype, "findByEmpleado", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una factura por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la factura', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Factura encontrada exitosamente',
        type: factura_entity_1.Factura,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Factura no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FacturaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar una factura' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la factura', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Factura actualizada exitosamente',
        type: factura_entity_1.Factura,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Factura no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_factura_dto_1.UpdateFacturaDto]),
    __metadata("design:returntype", Promise)
], FacturaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar una factura' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la factura', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Factura eliminada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Factura no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FacturaController.prototype, "remove", null);
exports.FacturaController = FacturaController = __decorate([
    (0, swagger_1.ApiTags)('Facturas'),
    (0, common_1.Controller)('factura'),
    __metadata("design:paramtypes", [factura_service_1.FacturaService])
], FacturaController);
//# sourceMappingURL=factura.controller.js.map