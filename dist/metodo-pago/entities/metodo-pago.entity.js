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
exports.MetodoPago = void 0;
const typeorm_1 = require("typeorm");
const pago_entity_1 = require("../../pago/entities/pago.entity");
let MetodoPago = class MetodoPago {
    idMetodoPago;
    descripcion;
    activo;
    pagos;
};
exports.MetodoPago = MetodoPago;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_metodo_pago' }),
    __metadata("design:type", Number)
], MetodoPago.prototype, "idMetodoPago", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], MetodoPago.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], MetodoPago.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pago_entity_1.Pago, pago => pago.metodoPago),
    __metadata("design:type", Array)
], MetodoPago.prototype, "pagos", void 0);
exports.MetodoPago = MetodoPago = __decorate([
    (0, typeorm_1.Entity)('metodo_pago')
], MetodoPago);
//# sourceMappingURL=metodo-pago.entity.js.map