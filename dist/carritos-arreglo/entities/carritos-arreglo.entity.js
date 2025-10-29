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
exports.CarritosArreglo = void 0;
const typeorm_1 = require("typeorm");
const carrito_entity_1 = require("../../carrito/entities/carrito.entity");
const arreglo_entity_1 = require("../../arreglo/entities/arreglo.entity");
let CarritosArreglo = class CarritosArreglo {
    idCarritoArreglo;
    idCarrito;
    idArreglo;
    cantidad;
    precioUnitario;
    totalLinea;
    carrito;
    arreglo;
};
exports.CarritosArreglo = CarritosArreglo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_carrito_arreglo' }),
    __metadata("design:type", Number)
], CarritosArreglo.prototype, "idCarritoArreglo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_carrito' }),
    __metadata("design:type", Number)
], CarritosArreglo.prototype, "idCarrito", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_arreglo' }),
    __metadata("design:type", Number)
], CarritosArreglo.prototype, "idArreglo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad', type: 'int' }),
    __metadata("design:type", Number)
], CarritosArreglo.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], CarritosArreglo.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_linea', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], CarritosArreglo.prototype, "totalLinea", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => carrito_entity_1.Carrito, carrito => carrito.carritosArreglo),
    (0, typeorm_1.JoinColumn)({ name: 'id_carrito' }),
    __metadata("design:type", carrito_entity_1.Carrito)
], CarritosArreglo.prototype, "carrito", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => arreglo_entity_1.Arreglo, arreglo => arreglo.carritosArreglo),
    (0, typeorm_1.JoinColumn)({ name: 'id_arreglo' }),
    __metadata("design:type", arreglo_entity_1.Arreglo)
], CarritosArreglo.prototype, "arreglo", void 0);
exports.CarritosArreglo = CarritosArreglo = __decorate([
    (0, typeorm_1.Entity)('carritos_arreglo')
], CarritosArreglo);
//# sourceMappingURL=carritos-arreglo.entity.js.map