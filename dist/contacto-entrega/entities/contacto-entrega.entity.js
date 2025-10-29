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
exports.ContactoEntrega = void 0;
const typeorm_1 = require("typeorm");
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
let ContactoEntrega = class ContactoEntrega {
    idContactoEntrega;
    nombre;
    apellido;
    telefono;
    pedidos;
};
exports.ContactoEntrega = ContactoEntrega;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_contacto_entrega' }),
    __metadata("design:type", Number)
], ContactoEntrega.prototype, "idContactoEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], ContactoEntrega.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellido', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], ContactoEntrega.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], ContactoEntrega.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pedido_entity_1.Pedido, pedido => pedido.contactoEntrega),
    __metadata("design:type", Array)
], ContactoEntrega.prototype, "pedidos", void 0);
exports.ContactoEntrega = ContactoEntrega = __decorate([
    (0, typeorm_1.Entity)('contacto_entrega')
], ContactoEntrega);
//# sourceMappingURL=contacto-entrega.entity.js.map