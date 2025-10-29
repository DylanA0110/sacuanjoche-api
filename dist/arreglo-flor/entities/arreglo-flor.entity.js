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
exports.ArregloFlor = void 0;
const typeorm_1 = require("typeorm");
const arreglo_entity_1 = require("../../arreglo/entities/arreglo.entity");
const flor_entity_1 = require("../../flor/entities/flor.entity");
let ArregloFlor = class ArregloFlor {
    idArregloFlor;
    idArreglo;
    idFlor;
    arreglo;
    flor;
};
exports.ArregloFlor = ArregloFlor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_arreglo_flor' }),
    __metadata("design:type", Number)
], ArregloFlor.prototype, "idArregloFlor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_arreglo' }),
    __metadata("design:type", Number)
], ArregloFlor.prototype, "idArreglo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_flor' }),
    __metadata("design:type", Number)
], ArregloFlor.prototype, "idFlor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => arreglo_entity_1.Arreglo, arreglo => arreglo.arreglosFlor),
    (0, typeorm_1.JoinColumn)({ name: 'id_arreglo' }),
    __metadata("design:type", arreglo_entity_1.Arreglo)
], ArregloFlor.prototype, "arreglo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => flor_entity_1.Flor, flor => flor.arreglosFlor),
    (0, typeorm_1.JoinColumn)({ name: 'id_flor' }),
    __metadata("design:type", flor_entity_1.Flor)
], ArregloFlor.prototype, "flor", void 0);
exports.ArregloFlor = ArregloFlor = __decorate([
    (0, typeorm_1.Entity)('arreglo_flor')
], ArregloFlor);
//# sourceMappingURL=arreglo-flor.entity.js.map