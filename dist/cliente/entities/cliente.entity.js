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
exports.Cliente = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
const cliente_direccion_entity_1 = require("../../cliente-direccion/entities/cliente-direccion.entity");
let Cliente = class Cliente {
    idCliente;
    primerNombre;
    primerApellido;
    telefono;
    activo;
    fechaCreacion;
    user;
    pedidos;
    direcciones;
};
exports.Cliente = Cliente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_cliente' }),
    __metadata("design:type", Number)
], Cliente.prototype, "idCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primer_nombre', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Cliente.prototype, "primerNombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primer_apellido', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Cliente.prototype, "primerApellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], Cliente.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Cliente.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion', type: 'timestamp' }),
    __metadata("design:type", Date)
], Cliente.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.cliente),
    (0, typeorm_1.JoinColumn)({ name: 'id_cliente' }),
    __metadata("design:type", user_entity_1.User)
], Cliente.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pedido_entity_1.Pedido, pedido => pedido.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "pedidos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cliente_direccion_entity_1.ClienteDireccion, clienteDireccion => clienteDireccion.cliente),
    __metadata("design:type", Array)
], Cliente.prototype, "direcciones", void 0);
exports.Cliente = Cliente = __decorate([
    (0, typeorm_1.Entity)('cliente')
], Cliente);
//# sourceMappingURL=cliente.entity.js.map