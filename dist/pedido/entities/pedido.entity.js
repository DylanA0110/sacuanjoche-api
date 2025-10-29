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
exports.Pedido = void 0;
const typeorm_1 = require("typeorm");
const empleado_entity_1 = require("../../empleado/entities/empleado.entity");
const cliente_entity_1 = require("../../cliente/entities/cliente.entity");
const direccion_entity_1 = require("../../direccion/entities/direccion.entity");
const contacto_entrega_entity_1 = require("../../contacto-entrega/entities/contacto-entrega.entity");
const detalle_pedido_entity_1 = require("../../detalle-pedido/entities/detalle-pedido.entity");
const pago_entity_1 = require("../../pago/entities/pago.entity");
const envio_entity_1 = require("../../envio/entities/envio.entity");
const factura_entity_1 = require("../../factura/entities/factura.entity");
const pedido_historial_entity_1 = require("../../pedido-historial/entities/pedido-historial.entity");
let Pedido = class Pedido {
    idPedido;
    idEmpleado;
    idCliente;
    idDireccion;
    idContactoEntrega;
    totalProductos;
    fechaCreacion;
    fechaActualizacion;
    fechaEntregaEstimada;
    direccionTxt;
    costoEnvio;
    totalPedido;
    empleado;
    cliente;
    direccion;
    contactoEntrega;
    detallesPedido;
    pagos;
    envio;
    factura;
    historial;
};
exports.Pedido = Pedido;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_pedido' }),
    __metadata("design:type", Number)
], Pedido.prototype, "idPedido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_empleado' }),
    __metadata("design:type", Number)
], Pedido.prototype, "idEmpleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_cliente' }),
    __metadata("design:type", Number)
], Pedido.prototype, "idCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_direccion' }),
    __metadata("design:type", Number)
], Pedido.prototype, "idDireccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_contacto_entrega' }),
    __metadata("design:type", Number)
], Pedido.prototype, "idContactoEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_productos', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pedido.prototype, "totalProductos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion', type: 'timestamp' }),
    __metadata("design:type", Date)
], Pedido.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'fecha_actualizacion', type: 'timestamp' }),
    __metadata("design:type", Date)
], Pedido.prototype, "fechaActualizacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_entrega_estimada', type: 'timestamp' }),
    __metadata("design:type", Date)
], Pedido.prototype, "fechaEntregaEstimada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion_txt', type: 'text' }),
    __metadata("design:type", String)
], Pedido.prototype, "direccionTxt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'costo_envio', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pedido.prototype, "costoEnvio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_pedido', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pedido.prototype, "totalPedido", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, empleado => empleado.pedidos),
    (0, typeorm_1.JoinColumn)({ name: 'id_empleado' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Pedido.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, cliente => cliente.pedidos),
    (0, typeorm_1.JoinColumn)({ name: 'id_cliente' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Pedido.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => direccion_entity_1.Direccion, direccion => direccion.pedidos),
    (0, typeorm_1.JoinColumn)({ name: 'id_direccion' }),
    __metadata("design:type", direccion_entity_1.Direccion)
], Pedido.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contacto_entrega_entity_1.ContactoEntrega, contactoEntrega => contactoEntrega.pedidos),
    (0, typeorm_1.JoinColumn)({ name: 'id_contacto_entrega' }),
    __metadata("design:type", contacto_entrega_entity_1.ContactoEntrega)
], Pedido.prototype, "contactoEntrega", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detalle_pedido_entity_1.DetallePedido, detallePedido => detallePedido.pedido),
    __metadata("design:type", Array)
], Pedido.prototype, "detallesPedido", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pago_entity_1.Pago, pago => pago.pedido),
    __metadata("design:type", Array)
], Pedido.prototype, "pagos", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => envio_entity_1.Envio, envio => envio.pedido),
    __metadata("design:type", envio_entity_1.Envio)
], Pedido.prototype, "envio", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => factura_entity_1.Factura, factura => factura.pedido),
    __metadata("design:type", factura_entity_1.Factura)
], Pedido.prototype, "factura", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pedido_historial_entity_1.PedidoHistorial, pedidoHistorial => pedidoHistorial.pedido),
    __metadata("design:type", Array)
], Pedido.prototype, "historial", void 0);
exports.Pedido = Pedido = __decorate([
    (0, typeorm_1.Entity)('pedido')
], Pedido);
//# sourceMappingURL=pedido.entity.js.map