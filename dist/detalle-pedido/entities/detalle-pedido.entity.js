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
exports.DetallePedido = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
const arreglo_entity_1 = require("../../arreglo/entities/arreglo.entity");
let DetallePedido = class DetallePedido {
    idDetallePedido;
    idPedido;
    idArreglo;
    cantidad;
    precioUnitario;
    subtotal;
    pedido;
    arreglo;
};
exports.DetallePedido = DetallePedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_detalle_pedido' }),
    __metadata("design:type", Number)
], DetallePedido.prototype, "idDetallePedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_pedido' }),
    __metadata("design:type", Number)
], DetallePedido.prototype, "idPedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_arreglo' }),
    __metadata("design:type", Number)
], DetallePedido.prototype, "idArreglo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad', type: 'int' }),
    __metadata("design:type", Number)
], DetallePedido.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], DetallePedido.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subtotal', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], DetallePedido.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pedido_entity_1.Pedido, pedido => pedido.detallesPedido),
    (0, typeorm_1.JoinColumn)({ name: 'id_pedido' }),
    __metadata("design:type", pedido_entity_1.Pedido)
], DetallePedido.prototype, "pedido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => arreglo_entity_1.Arreglo, arreglo => arreglo.detallesPedido),
    (0, typeorm_1.JoinColumn)({ name: 'id_arreglo' }),
    __metadata("design:type", arreglo_entity_1.Arreglo)
], DetallePedido.prototype, "arreglo", void 0);
exports.DetallePedido = DetallePedido = __decorate([
    (0, typeorm_1.Entity)('detalle_pedido')
], DetallePedido);
//# sourceMappingURL=detalle-pedido.entity.js.map