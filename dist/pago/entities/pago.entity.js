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
exports.Pago = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
const metodo_pago_entity_1 = require("../../metodo-pago/entities/metodo-pago.entity");
let Pago = class Pago {
    idPago;
    idPedido;
    idMetodoPago;
    monto;
    estado;
    fechaPago;
    referencia;
    gateway;
    idGateway;
    paymentUrlExt;
    rawPayload;
    pedido;
    metodoPago;
};
exports.Pago = Pago;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_pago' }),
    __metadata("design:type", Number)
], Pago.prototype, "idPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_pedido' }),
    __metadata("design:type", Number)
], Pago.prototype, "idPedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_metodo_pago' }),
    __metadata("design:type", Number)
], Pago.prototype, "idMetodoPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monto', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pago.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Pago.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_pago', type: 'timestamp' }),
    __metadata("design:type", Date)
], Pago.prototype, "fechaPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'referencia', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], Pago.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gateway', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Pago.prototype, "gateway", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_gateway', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], Pago.prototype, "idGateway", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_url_ext', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Pago.prototype, "paymentUrlExt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'raw_payload', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Pago.prototype, "rawPayload", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pedido_entity_1.Pedido, pedido => pedido.pagos),
    (0, typeorm_1.JoinColumn)({ name: 'id_pedido' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], Pago.prototype, "pedido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => metodo_pago_entity_1.MetodoPago, metodoPago => metodoPago.pagos),
    (0, typeorm_1.JoinColumn)({ name: 'id_metodo_pago' }),
    __metadata("design:type", metodo_pago_entity_1.MetodoPago)
], Pago.prototype, "metodoPago", void 0);
exports.Pago = Pago = __decorate([
    (0, typeorm_1.Entity)('pago')
], Pago);
//# sourceMappingURL=pago.entity.js.map