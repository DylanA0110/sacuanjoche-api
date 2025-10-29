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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const pagination_dto_1 = require("../common/dtos/pagination.dto");
const user_entity_1 = require("./entities/user.entity");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    findAll(paginationDto) {
        return this.userService.findAll(paginationDto);
    }
    findActiveUsers() {
        return this.userService.findActiveUsers();
    }
    findByUsername(username) {
        return this.userService.findByUsername(username);
    }
    findByRole(role) {
        return this.userService.findByRole(role);
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    remove(id) {
        return this.userService.remove(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo usuario' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuario creado exitosamente',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los usuarios con paginación' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de usuarios obtenida exitosamente',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' }
                },
                total: { type: 'number', description: 'Total de registros' }
            }
        }
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los usuarios activos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de usuarios activos obtenida exitosamente',
        type: [user_entity_1.User],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findActiveUsers", null);
__decorate([
    (0, common_1.Get)('username/:username'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar usuario por nombre de usuario' }),
    (0, swagger_1.ApiParam)({ name: 'username', description: 'Nombre de usuario', example: 'juan.perez' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario encontrado por nombre de usuario',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Usuario no encontrado',
    }),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findByUsername", null);
__decorate([
    (0, common_1.Get)('role/:role'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar usuarios por rol' }),
    (0, swagger_1.ApiParam)({ name: 'role', description: 'Rol del usuario', example: 'admin' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuarios encontrados por rol',
        type: [user_entity_1.User],
    }),
    __param(0, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findByRole", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un usuario por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del usuario', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario encontrado exitosamente',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Usuario no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un usuario' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del usuario', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario actualizado exitosamente',
        type: user_entity_1.User,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Usuario no encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un usuario' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID del usuario', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuario eliminado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Usuario no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map