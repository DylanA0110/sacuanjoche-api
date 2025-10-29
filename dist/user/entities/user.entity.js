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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const empleado_entity_1 = require("../../empleado/entities/empleado.entity");
const cliente_entity_1 = require("../../cliente/entities/cliente.entity");
const carrito_entity_1 = require("../../carrito/entities/carrito.entity");
let User = class User {
    idUser;
    idEmpleado;
    idCliente;
    password;
    username;
    roles;
    activo;
    empleado;
    cliente;
    carrito;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_user' }),
    __metadata("design:type", Number)
], User.prototype, "idUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_empleado', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "idEmpleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_cliente', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "idCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'username', type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'roles', type: 'json' }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, empleado => empleado.users),
    (0, typeorm_1.JoinColumn)({ name: 'id_empleado' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], User.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, cliente => cliente.user),
    (0, typeorm_1.JoinColumn)({ name: 'id_cliente' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], User.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => carrito_entity_1.Carrito, carrito => carrito.user),
    __metadata("design:type", carrito_entity_1.Carrito)
], User.prototype, "carrito", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('user')
], User);
//# sourceMappingURL=user.entity.js.map