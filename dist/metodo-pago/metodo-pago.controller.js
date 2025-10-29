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
exports.MetodoPagoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const metodo_pago_service_1 = require("./metodo-pago.service");
const create_metodo_pago_dto_1 = require("./dto/create-metodo-pago.dto");
const update_metodo_pago_dto_1 = require("./dto/update-metodo-pago.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const metodo_pago_entity_1 = require("./entities/metodo-pago.entity");
let MetodoPagoController = class MetodoPagoController {
    metodoPagoService;
    constructor(metodoPagoService) {
        this.metodoPagoService = metodoPagoService;
    }
    create(createMetodoPagoDto) {
        return this.metodoPagoService.create(createMetodoPagoDto);
    }
    findAll(paginationDto) {
        return this.metodoPagoService.findAll(paginationDto);
    }
    findActiveMetodosPago() {
        return this.metodoPagoService.findActiveMetodosPago();
    }
    findOne(id) {
        return this.metodoPagoService.findOne(id);
    }
    update(id, updateMetodoPagoDto) {
        return this.metodoPagoService.update(id, updateMetodoPagoDto);
    }
    remove(id) {
        return this.metodoPagoService.remove(id);
    }
};
exports.MetodoPagoController = MetodoPagoController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo método de pago' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Método de pago creado exitosamente',
        type: metodo_pago_entity_1.MetodoPago,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_metodo_pago_dto_1.CreateMetodoPagoDto]),
    __metadata("design:returntype", Promise)
], MetodoPagoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los métodos de pago con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de métodos de pago obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/MetodoPago' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], MetodoPagoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los métodos de pago activos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de métodos de pago activos obtenida exitosamente',
        type: [metodo_pago_entity_1.MetodoPago],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetodoPagoController.prototype, "findActiveMetodosPago", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un método de pago por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del método de pago', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Método de pago encontrado exitosamente',
        type: metodo_pago_entity_1.MetodoPago,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Método de pago no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MetodoPagoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un método de pago' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del método de pago', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Método de pago actualizado exitosamente',
        type: metodo_pago_entity_1.MetodoPago,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Método de pago no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_metodo_pago_dto_1.UpdateMetodoPagoDto]),
    __metadata("design:returntype", Promise)
], MetodoPagoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un método de pago' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del método de pago', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Método de pago eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Método de pago no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MetodoPagoController.prototype, "remove", null);
exports.MetodoPagoController = MetodoPagoController = __decorate([
    (0, swagger_1.ApiTags)('Métodos de Pago'),
    (0, common_1.Controller)('metodo-pago'),
    __metadata("design:paramtypes", [metodo_pago_service_1.MetodoPagoService])
], MetodoPagoController);
//# sourceMappingURL=metodo-pago.controller.js.map