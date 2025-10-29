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
exports.Flor = void 0;
const typeorm_1 = require("typeorm");
const arreglo_flor_entity_1 = require("../../arreglo-flor/entities/arreglo-flor.entity");
let Flor = class Flor {
    idFlor;
    nombre;
    color;
    tipo;
    activo;
    arreglosFlor;
};
exports.Flor = Flor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_flor' }),
    __metadata("design:type", Number)
], Flor.prototype, "idFlor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Flor.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'color', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Flor.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Flor.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Flor.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => arreglo_flor_entity_1.ArregloFlor, arregloFlor => arregloFlor.flor),
    __metadata("design:type", Array)
], Flor.prototype, "arreglosFlor", void 0);
exports.Flor = Flor = __decorate([
    (0, typeorm_1.Entity)('flor')
], Flor);
//# sourceMappingURL=flor.entity.js.map