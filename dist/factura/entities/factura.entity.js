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
exports.Factura = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
const empleado_entity_1 = require("../../empleado/entities/empleado.entity");
let Factura = class Factura {
    idFactura;
    idPedido;
    idEmpleado;
    numFactura;
    fechaEmision;
    estado;
    montoTotal;
    pedido;
    empleado;
};
exports.Factura = Factura;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_factura' }),
    __metadata("design:type", Number)
], Factura.prototype, "idFactura", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_pedido' }),
    __metadata("design:type", Number)
], Factura.prototype, "idPedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_empleado' }),
    __metadata("design:type", Number)
], Factura.prototype, "idEmpleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'num_factura', type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Factura.prototype, "numFactura", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_emision', type: 'timestamp' }),
    __metadata("design:type", Date)
], Factura.prototype, "fechaEmision", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Factura.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monto_total', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Factura.prototype, "montoTotal", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => pedido_entity_1.Pedido, pedido => pedido.factura),
    (0, typeorm_1.JoinColumn)({ name: 'id_pedido' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], Factura.prototype, "pedido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, empleado => empleado.facturas),
    (0, typeorm_1.JoinColumn)({ name: 'id_empleado' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Factura.prototype, "empleado", void 0);
exports.Factura = Factura = __decorate([
    (0, typeorm_1.Entity)('factura')
], Factura);
//# sourceMappingURL=factura.entity.js.map