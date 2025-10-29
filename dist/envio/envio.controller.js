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
exports.EnvioController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const envio_service_1 = require("./envio.service");
const create_envio_dto_1 = require("./dto/create-envio.dto");
const update_envio_dto_1 = require("./dto/update-envio.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const envio_entity_1 = require("./entities/envio.entity");
let EnvioController = class EnvioController {
    envioService;
    constructor(envioService) {
        this.envioService = envioService;
    }
    create(createEnvioDto) {
        return this.envioService.create(createEnvioDto);
    }
    findAll(paginationDto) {
        return this.envioService.findAll(paginationDto);
    }
    findByEstado(estadoEnvio) {
        return this.envioService.findByEstado(estadoEnvio);
    }
    findOne(id) {
        return this.envioService.findOne(id);
    }
    update(id, updateEnvioDto) {
        return this.envioService.update(id, updateEnvioDto);
    }
    remove(id) {
        return this.envioService.remove(id);
    }
};
exports.EnvioController = EnvioController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo envío' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Envío creado exitosamente', type: envio_entity_1.Envio }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_envio_dto_1.CreateEnvioDto]),
    __metadata("design:returntype", Promise)
], EnvioController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los envíos con paginación' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista obtenida exitosamente' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], EnvioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('estado/:estadoEnvio'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar envíos por estado' }),
    (0, swagger_1.ApiParam)({ name: 'estadoEnvio', description: 'Estado del envío', example: 'Programado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Envíos encontrados', type: [envio_entity_1.Envio] }),
    __param(0, (0, common_1.Param)('estadoEnvio')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnvioController.prototype, "findByEstado", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un envío por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del envío', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Envío encontrado', type: envio_entity_1.Envio }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EnvioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un envío' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del envío', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Actualizado exitosamente', type: envio_entity_1.Envio }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_envio_dto_1.UpdateEnvioDto]),
    __metadata("design:returntype", Promise)
], EnvioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un envío' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del envío', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Eliminado exitosamente' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EnvioController.prototype, "remove", null);
exports.EnvioController = EnvioController = __decorate([
    (0, swagger_1.ApiTags)('Envíos'),
    (0, common_1.Controller)('envio'),
    __metadata("design:paramtypes", [envio_service_1.EnvioService])
], EnvioController);
//# sourceMappingURL=envio.controller.js.map