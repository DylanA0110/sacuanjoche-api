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
exports.FormaArreglo = void 0;
const typeorm_1 = require("typeorm");
const arreglo_entity_1 = require("../../arreglo/entities/arreglo.entity");
let FormaArreglo = class FormaArreglo {
    idFormaArreglo;
    descripcion;
    arreglos;
};
exports.FormaArreglo = FormaArreglo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_forma_arreglo' }),
    __metadata("design:type", Number)
], FormaArreglo.prototype, "idFormaArreglo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], FormaArreglo.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => arreglo_entity_1.Arreglo, arreglo => arreglo.formaArreglo),
    __metadata("design:type", Array)
], FormaArreglo.prototype, "arreglos", void 0);
exports.FormaArreglo = FormaArreglo = __decorate([
    (0, typeorm_1.Entity)('forma_arreglo')
], FormaArreglo);
//# sourceMappingURL=forma-arreglo.entity.js.map