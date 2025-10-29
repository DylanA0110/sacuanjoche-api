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
exports.EmpleadoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const empleado_service_1 = require("./empleado.service");
const create_empleado_dto_1 = require("./dto/create-empleado.dto");
const update_empleado_dto_1 = require("./dto/update-empleado.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const empleado_entity_1 = require("./entities/empleado.entity");
let EmpleadoController = class EmpleadoController {
    empleadoService;
    constructor(empleadoService) {
        this.empleadoService = empleadoService;
    }
    create(createEmpleadoDto) {
        return this.empleadoService.create(createEmpleadoDto);
    }
    findAll(paginationDto) {
        return this.empleadoService.findAll(paginationDto);
    }
    findActiveEmpleados() {
        return this.empleadoService.findActiveEmpleados();
    }
    findBySexo(sexo) {
        return this.empleadoService.findBySexo(sexo);
    }
    findOne(id) {
        return this.empleadoService.findOne(id);
    }
    update(id, updateEmpleadoDto) {
        return this.empleadoService.update(id, updateEmpleadoDto);
    }
    remove(id) {
        return this.empleadoService.remove(id);
    }
};
exports.EmpleadoController = EmpleadoController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo empleado' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Empleado creado exitosamente',
        type: empleado_entity_1.Empleado,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_empleado_dto_1.CreateEmpleadoDto]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los empleados con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de empleados obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Empleado' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], EmpleadoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los empleados activos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de empleados activos obtenida exitosamente',
        type: [empleado_entity_1.Empleado],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmpleadoController.prototype, "findActiveEmpleados", null);
__decorate([
    (0, common_1.Get)('sexo/:sexo'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar empleados por sexo' }),
    (0, swagger_1.ApiParam)({ name: 'sexo', description: 'Sexo del empleado', example: 'M' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Empleados encontrados por sexo',
        type: [empleado_entity_1.Empleado],
    }),
    __param(0, (0, common_1.Param)('sexo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmpleadoController.prototype, "findBySexo", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un empleado por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del empleado', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Empleado encontrado exitosamente',
        type: empleado_entity_1.Empleado,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Empleado no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un empleado' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del empleado', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Empleado actualizado exitosamente',
        type: empleado_entity_1.Empleado,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Empleado no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_empleado_dto_1.UpdateEmpleadoDto]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un empleado' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del empleado', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Empleado eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Empleado no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmpleadoController.prototype, "remove", null);
exports.EmpleadoController = EmpleadoController = __decorate([
    (0, swagger_1.ApiTags)('Empleados'),
    (0, common_1.Controller)('empleado'),
    __metadata("design:paramtypes", [empleado_service_1.EmpleadoService])
], EmpleadoController);
//# sourceMappingURL=empleado.controller.js.map