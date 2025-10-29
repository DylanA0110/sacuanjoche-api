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
exports.PedidoHistorial = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
const empleado_entity_1 = require("../../empleado/entities/empleado.entity");
let PedidoHistorial = class PedidoHistorial {
    idPedidoHistorial;
    idPedido;
    idEmpleado;
    estado;
    fechaCambio;
    nota;
    pedido;
    empleado;
};
exports.PedidoHistorial = PedidoHistorial;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_pedido_historial' }),
    __metadata("design:type", Number)
], PedidoHistorial.prototype, "idPedidoHistorial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_pedido' }),
    __metadata("design:type", Number)
], PedidoHistorial.prototype, "idPedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_empleado' }),
    __metadata("design:type", Number)
], PedidoHistorial.prototype, "idEmpleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], PedidoHistorial.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_cambio', type: 'timestamp' }),
    __metadata("design:type", Date)
], PedidoHistorial.prototype, "fechaCambio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nota', type: 'text', nullable: true }),
    __metadata("design:type", String)
], PedidoHistorial.prototype, "nota", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pedido_entity_1.Pedido, pedido => pedido.historial),
    (0, typeorm_1.JoinColumn)({ name: 'id_pedido' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], PedidoHistorial.prototype, "pedido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, empleado => empleado.pedidosHistorial),
    (0, typeorm_1.JoinColumn)({ name: 'id_empleado' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], PedidoHistorial.prototype, "empleado", void 0);
exports.PedidoHistorial = PedidoHistorial = __decorate([
    (0, typeorm_1.Entity)('pedido_historial')
], PedidoHistorial);
//# sourceMappingURL=pedido-historial.entity.js.map