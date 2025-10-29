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
exports.Envio = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
const empleado_entity_1 = require("../../empleado/entities/empleado.entity");
let Envio = class Envio {
    idEnvio;
    idPedido;
    idEmpleado;
    estadoEnvio;
    fechaProgramada;
    fechaSalida;
    fechaEntrega;
    origenLat;
    origenLng;
    destinoLat;
    destinoLng;
    costoEnvio;
    observaciones;
    pedido;
    empleado;
};
exports.Envio = Envio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_envio' }),
    __metadata("design:type", Number)
], Envio.prototype, "idEnvio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_pedido' }),
    __metadata("design:type", Number)
], Envio.prototype, "idPedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_empleado' }),
    __metadata("design:type", Number)
], Envio.prototype, "idEmpleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado_envio', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Envio.prototype, "estadoEnvio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_programada', type: 'timestamp' }),
    __metadata("design:type", Date)
], Envio.prototype, "fechaProgramada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_salida', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Envio.prototype, "fechaSalida", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_entrega', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Envio.prototype, "fechaEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'origen_lat', type: 'decimal', precision: 10, scale: 8 }),
    __metadata("design:type", Number)
], Envio.prototype, "origenLat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'origen_lng', type: 'decimal', precision: 11, scale: 8 }),
    __metadata("design:type", Number)
], Envio.prototype, "origenLng", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'destino_lat', type: 'decimal', precision: 10, scale: 8 }),
    __metadata("design:type", Number)
], Envio.prototype, "destinoLat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'destino_lng', type: 'decimal', precision: 11, scale: 8 }),
    __metadata("design:type", Number)
], Envio.prototype, "destinoLng", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'costo_envio', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Envio.prototype, "costoEnvio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'observaciones', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Envio.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => pedido_entity_1.Pedido, pedido => pedido.envio),
    (0, typeorm_1.JoinColumn)({ name: 'id_pedido' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], Envio.prototype, "pedido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, empleado => empleado.envios),
    (0, typeorm_1.JoinColumn)({ name: 'id_empleado' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Envio.prototype, "empleado", void 0);
exports.Envio = Envio = __decorate([
    (0, typeorm_1.Entity)('envio')
], Envio);
//# sourceMappingURL=envio.entity.js.map