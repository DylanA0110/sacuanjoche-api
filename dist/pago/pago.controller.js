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
exports.PagoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pago_service_1 = require("./pago.service");
const create_pago_dto_1 = require("./dto/create-pago.dto");
const update_pago_dto_1 = require("./dto/update-pago.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const pago_entity_1 = require("./entities/pago.entity");
let PagoController = class PagoController {
    pagoService;
    constructor(pagoService) {
        this.pagoService = pagoService;
    }
    create(createPagoDto) {
        return this.pagoService.create(createPagoDto);
    }
    findAll(paginationDto) {
        return this.pagoService.findAll(paginationDto);
    }
    findByEstado(estado) {
        return this.pagoService.findByEstado(estado);
    }
    findByPedido(idPedido) {
        return this.pagoService.findByPedido(idPedido);
    }
    findOne(id) {
        return this.pagoService.findOne(id);
    }
    update(id, updatePagoDto) {
        return this.pagoService.update(id, updatePagoDto);
    }
    remove(id) {
        return this.pagoService.remove(id);
    }
};
exports.PagoController = PagoController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo pago' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Pago creado exitosamente',
        type: pago_entity_1.Pago,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pago_dto_1.CreatePagoDto]),
    __metadata("design:returntype", Promise)
], PagoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los pagos con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de pagos obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Pago' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PagoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('estado/:estado'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pagos por estado' }),
    (0, swagger_1.ApiParam)({ name: 'estado', description: 'Estado del pago', example: 'Completado' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pagos encontrados por estado',
        type: [pago_entity_1.Pago],
    }),
    __param(0, (0, common_1.Param)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PagoController.prototype, "findByEstado", null);
__decorate([
    (0, common_1.Get)('pedido/:idPedido'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar pagos por pedido' }),
    (0, swagger_1.ApiParam)({ name: 'idPedido', description: 'ID del pedido', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pagos encontrados por pedido',
        type: [pago_entity_1.Pago],
    }),
    __param(0, (0, common_1.Param)('idPedido', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PagoController.prototype, "findByPedido", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un pago por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del pago', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pago encontrado exitosamente',
        type: pago_entity_1.Pago,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pago no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PagoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un pago' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del pago', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pago actualizado exitosamente',
        type: pago_entity_1.Pago,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pago no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_pago_dto_1.UpdatePagoDto]),
    __metadata("design:returntype", Promise)
], PagoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un pago' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del pago', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pago eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pago no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PagoController.prototype, "remove", null);
exports.PagoController = PagoController = __decorate([
    (0, swagger_1.ApiTags)('Pagos'),
    (0, common_1.Controller)('pago'),
    __metadata("design:paramtypes", [pago_service_1.PagoService])
], PagoController);
//# sourceMappingURL=pago.controller.js.map