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
exports.ContactoEntregaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contacto_entrega_service_1 = require("./contacto-entrega.service");
const create_contacto_entrega_dto_1 = require("./dto/create-contacto-entrega.dto");
const update_contacto_entrega_dto_1 = require("./dto/update-contacto-entrega.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const contacto_entrega_entity_1 = require("./entities/contacto-entrega.entity");
let ContactoEntregaController = class ContactoEntregaController {
    contactoEntregaService;
    constructor(contactoEntregaService) {
        this.contactoEntregaService = contactoEntregaService;
    }
    create(createContactoEntregaDto) {
        return this.contactoEntregaService.create(createContactoEntregaDto);
    }
    findAll(paginationDto) {
        return this.contactoEntregaService.findAll(paginationDto);
    }
    findByTelefono(telefono) {
        return this.contactoEntregaService.findByTelefono(telefono);
    }
    findOne(id) {
        return this.contactoEntregaService.findOne(id);
    }
    update(id, updateContactoEntregaDto) {
        return this.contactoEntregaService.update(id, updateContactoEntregaDto);
    }
    remove(id) {
        return this.contactoEntregaService.remove(id);
    }
};
exports.ContactoEntregaController = ContactoEntregaController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo contacto de entrega' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Contacto de entrega creado exitosamente',
        type: contacto_entrega_entity_1.ContactoEntrega,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contacto_entrega_dto_1.CreateContactoEntregaDto]),
    __metadata("design:returntype", Promise)
], ContactoEntregaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los contactos de entrega con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de contactos de entrega obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/ContactoEntrega' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ContactoEntregaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('telefono/:telefono'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar contactos de entrega por teléfono' }),
    (0, swagger_1.ApiParam)({ name: 'telefono', description: 'Número de teléfono', example: '+1234567890' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Contactos de entrega encontrados por teléfono',
        type: [contacto_entrega_entity_1.ContactoEntrega],
    }),
    __param(0, (0, common_1.Param)('telefono')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactoEntregaController.prototype, "findByTelefono", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un contacto de entrega por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del contacto de entrega', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Contacto de entrega encontrado exitosamente',
        type: contacto_entrega_entity_1.ContactoEntrega,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Contacto de entrega no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactoEntregaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un contacto de entrega' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del contacto de entrega', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Contacto de entrega actualizado exitosamente',
        type: contacto_entrega_entity_1.ContactoEntrega,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Contacto de entrega no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_contacto_entrega_dto_1.UpdateContactoEntregaDto]),
    __metadata("design:returntype", Promise)
], ContactoEntregaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un contacto de entrega' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del contacto de entrega', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Contacto de entrega eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Contacto de entrega no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ContactoEntregaController.prototype, "remove", null);
exports.ContactoEntregaController = ContactoEntregaController = __decorate([
    (0, swagger_1.ApiTags)('Contactos de Entrega'),
    (0, common_1.Controller)('contacto-entrega'),
    __metadata("design:paramtypes", [contacto_entrega_service_1.ContactoEntregaService])
], ContactoEntregaController);
//# sourceMappingURL=contacto-entrega.controller.js.map