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
exports.ClienteDireccion = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("../../cliente/entities/cliente.entity");
const direccion_entity_1 = require("../../direccion/entities/direccion.entity");
let ClienteDireccion = class ClienteDireccion {
    idClienteDireccion;
    idCliente;
    idDireccion;
    etiqueta;
    esPredeterminada;
    activo;
    cliente;
    direccion;
};
exports.ClienteDireccion = ClienteDireccion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_cliente_direccion' }),
    __metadata("design:type", Number)
], ClienteDireccion.prototype, "idClienteDireccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_cliente' }),
    __metadata("design:type", Number)
], ClienteDireccion.prototype, "idCliente", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_direccion' }),
    __metadata("design:type", Number)
], ClienteDireccion.prototype, "idDireccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'etiqueta', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], ClienteDireccion.prototype, "etiqueta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'es_predeterminada', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ClienteDireccion.prototype, "esPredeterminada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ClienteDireccion.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente, cliente => cliente.direcciones),
    (0, typeorm_1.JoinColumn)({ name: 'id_cliente' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], ClienteDireccion.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => direccion_entity_1.Direccion, direccion => direccion.clienteDirecciones),
    (0, typeorm_1.JoinColumn)({ name: 'id_direccion' }),
    __metadata("design:type", direccion_entity_1.Direccion)
], ClienteDireccion.prototype, "direccion", void 0);
exports.ClienteDireccion = ClienteDireccion = __decorate([
    (0, typeorm_1.Entity)('cliente_direccion')
], ClienteDireccion);
//# sourceMappingURL=cliente-direccion.entity.js.map