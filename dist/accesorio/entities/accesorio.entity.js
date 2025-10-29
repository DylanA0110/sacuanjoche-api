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
exports.Accesorio = void 0;
const typeorm_1 = require("typeorm");
const accesorios_arreglo_entity_1 = require("../../accesorios-arreglo/entities/accesorios-arreglo.entity");
let Accesorio = class Accesorio {
    idAccesorio;
    descripcion;
    precioUnitario;
    activo;
    categoria;
    accesoriosArreglo;
};
exports.Accesorio = Accesorio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_accesorio' }),
    __metadata("design:type", Number)
], Accesorio.prototype, "idAccesorio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Accesorio.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Accesorio.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Accesorio.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'categoria', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Accesorio.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => accesorios_arreglo_entity_1.AccesoriosArreglo, accesoriosArreglo => accesoriosArreglo.accesorio),
    __metadata("design:type", Array)
], Accesorio.prototype, "accesoriosArreglo", void 0);
exports.Accesorio = Accesorio = __decorate([
    (0, typeorm_1.Entity)('accesorio')
], Accesorio);
//# sourceMappingURL=accesorio.entity.js.map