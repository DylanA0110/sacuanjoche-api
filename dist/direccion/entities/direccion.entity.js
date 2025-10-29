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
exports.Direccion = void 0;
const typeorm_1 = require("typeorm");
const cliente_direccion_entity_1 = require("../../cliente-direccion/entities/cliente-direccion.entity");
const pedido_entity_1 = require("../../pedido/entities/pedido.entity");
let Direccion = class Direccion {
    idDireccion;
    formattedAddress;
    country;
    stateProv;
    city;
    neighborhood;
    street;
    houseNumber;
    postalCode;
    referencia;
    lat;
    lng;
    provider;
    placeId;
    accuracy;
    geolocation;
    activo;
    fechaCreacion;
    fechaUltAct;
    clienteDirecciones;
    pedidos;
};
exports.Direccion = Direccion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_direccion' }),
    __metadata("design:type", Number)
], Direccion.prototype, "idDireccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'formatted_address', type: 'text' }),
    __metadata("design:type", String)
], Direccion.prototype, "formattedAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Direccion.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'state_prov', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Direccion.prototype, "stateProv", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Direccion.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'neighborhood', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Direccion.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'street', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Direccion.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'house_number', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Direccion.prototype, "houseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Direccion.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'referencia', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Direccion.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lat', type: 'decimal', precision: 10, scale: 8 }),
    __metadata("design:type", Number)
], Direccion.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lng', type: 'decimal', precision: 11, scale: 8 }),
    __metadata("design:type", Number)
], Direccion.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provider', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Direccion.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'place_id', type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], Direccion.prototype, "placeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accuracy', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Direccion.prototype, "accuracy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'geolocation', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Direccion.prototype, "geolocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Direccion.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion', type: 'timestamp' }),
    __metadata("design:type", Date)
], Direccion.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'fecha_ult_act', type: 'timestamp' }),
    __metadata("design:type", Date)
], Direccion.prototype, "fechaUltAct", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cliente_direccion_entity_1.ClienteDireccion, clienteDireccion => clienteDireccion.direccion),
    __metadata("design:type", Array)
], Direccion.prototype, "clienteDirecciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pedido_entity_1.Pedido, pedido => pedido.direccion),
    __metadata("design:type", Array)
], Direccion.prototype, "pedidos", void 0);
exports.Direccion = Direccion = __decorate([
    (0, typeorm_1.Entity)('direccion')
], Direccion);
//# sourceMappingURL=direccion.entity.js.map