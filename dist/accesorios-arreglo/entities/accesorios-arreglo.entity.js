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
exports.AccesoriosArreglo = void 0;
const typeorm_1 = require("typeorm");
const accesorio_entity_1 = require("../../accesorio/entities/accesorio.entity");
const arreglo_entity_1 = require("../../arreglo/entities/arreglo.entity");
let AccesoriosArreglo = class AccesoriosArreglo {
    idAccesorioArreglo;
    idAccesorio;
    idArreglo;
    accesorio;
    arreglo;
};
exports.AccesoriosArreglo = AccesoriosArreglo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_accesorio_arreglo' }),
    __metadata("design:type", Number)
], AccesoriosArreglo.prototype, "idAccesorioArreglo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_accesorio' }),
    __metadata("design:type", Number)
], AccesoriosArreglo.prototype, "idAccesorio", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_arreglo' }),
    __metadata("design:type", Number)
], AccesoriosArreglo.prototype, "idArreglo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accesorio_entity_1.Accesorio, accesorio => accesorio.accesoriosArreglo),
    (0, typeorm_1.JoinColumn)({ name: 'id_accesorio' }),
    __metadata("design:type", accesorio_entity_1.Accesorio)
], AccesoriosArreglo.prototype, "accesorio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => arreglo_entity_1.Arreglo, arreglo => arreglo.accesoriosArreglo),
    (0, typeorm_1.JoinColumn)({ name: 'id_arreglo' }),
    __metadata("design:type", arreglo_entity_1.Arreglo)
], AccesoriosArreglo.prototype, "arreglo", void 0);
exports.AccesoriosArreglo = AccesoriosArreglo = __decorate([
    (0, typeorm_1.Entity)('accesorios_arreglo')
], AccesoriosArreglo);
//# sourceMappingURL=accesorios-arreglo.entity.js.map