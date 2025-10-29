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
exports.Empleado = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
const envio_entity_1 = require("../../envio/entities/envio.entity");
const factura_entity_1 = require("../../factura/entities/factura.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const pedido_historial_entity_1 = require("../../pedido-historial/entities/pedido-historial.entity");
let Empleado = class Empleado {
    idEmpleado;
    primerNombre;
    primerApellido;
    segundoApellido;
    sexo;
    telefono;
    fechaNac;
    activo;
    fechaCreacion;
    pedidos;
    envios;
    facturas;
    users;
    pedidosHistorial;
};
exports.Empleado = Empleado;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_empleado' }),
    __metadata("design:type", Number)
], Empleado.prototype, "idEmpleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primer_nombre', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Empleado.prototype, "primerNombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primer_apellido', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Empleado.prototype, "primerApellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'segundo_apellido', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Empleado.prototype, "segundoApellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sexo', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], Empleado.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Empleado.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_nac', type: 'date' }),
    __metadata("design:type", Date)
], Empleado.prototype, "fechaNac", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Empleado.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion', type: 'timestamp' }),
    __metadata("design:type", Date)
], Empleado.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pedido_entity_1.Pedido, pedido => pedido.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "pedidos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => envio_entity_1.Envio, envio => envio.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "envios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => factura_entity_1.Factura, factura => factura.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "facturas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, user => user.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pedido_historial_entity_1.PedidoHistorial, pedidoHistorial => pedidoHistorial.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "pedidosHistorial", void 0);
exports.Empleado = Empleado = __decorate([
    (0, typeorm_1.Entity)('empleado')
], Empleado);
//# sourceMappingURL=empleado.entity.js.map