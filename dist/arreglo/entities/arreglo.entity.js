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
exports.Arreglo = void 0;
const typeorm_1 = require("typeorm");
const forma_arreglo_entity_1 = require("../../forma-arreglo/entities/forma-arreglo.entity");
const arreglo_flor_entity_1 = require("../../arreglo-flor/entities/arreglo-flor.entity");
const accesorios_arreglo_entity_1 = require("../../accesorios-arreglo/entities/accesorios-arreglo.entity");
const carritos_arreglo_entity_1 = require("../../carritos-arreglo/entities/carritos-arreglo.entity");
const detalle_pedido_entity_1 = require("../../detalle-pedido/entities/detalle-pedido.entity");
let Arreglo = class Arreglo {
    idArreglo;
    idFormaArreglo;
    nombre;
    descripcion;
    precioUnitario;
    cantidadFlores;
    activo;
    fechaCreacion;
    formaArreglo;
    arreglosFlor;
    accesoriosArreglo;
    carritosArreglo;
    detallesPedido;
};
exports.Arreglo = Arreglo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_arreglo' }),
    __metadata("design:type", Number)
], Arreglo.prototype, "idArreglo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_forma_arreglo' }),
    __metadata("design:type", Number)
], Arreglo.prototype, "idFormaArreglo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Arreglo.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Arreglo.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Arreglo.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad_flores', type: 'int' }),
    __metadata("design:type", Number)
], Arreglo.prototype, "cantidadFlores", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Arreglo.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion', type: 'timestamp' }),
    __metadata("design:type", Date)
], Arreglo.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => forma_arreglo_entity_1.FormaArreglo, formaArreglo => formaArreglo.arreglos),
    (0, typeorm_1.JoinColumn)({ name: 'id_forma_arreglo' }),
    __metadata("design:type", forma_arreglo_entity_1.FormaArreglo)
], Arreglo.prototype, "formaArreglo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => arreglo_flor_entity_1.ArregloFlor, arregloFlor => arregloFlor.arreglo),
    __metadata("design:type", Array)
], Arreglo.prototype, "arreglosFlor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => accesorios_arreglo_entity_1.AccesoriosArreglo, accesoriosArreglo => accesoriosArreglo.arreglo),
    __metadata("design:type", Array)
], Arreglo.prototype, "accesoriosArreglo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => carritos_arreglo_entity_1.CarritosArreglo, carritosArreglo => carritosArreglo.arreglo),
    __metadata("design:type", Array)
], Arreglo.prototype, "carritosArreglo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => detalle_pedido_entity_1.DetallePedido, detallePedido => detallePedido.arreglo),
    __metadata("design:type", Array)
], Arreglo.prototype, "detallesPedido", void 0);
exports.Arreglo = Arreglo = __decorate([
    (0, typeorm_1.Entity)('arreglo')
], Arreglo);
//# sourceMappingURL=arreglo.entity.js.map