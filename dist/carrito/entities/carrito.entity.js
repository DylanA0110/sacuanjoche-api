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
exports.Carrito = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const carritos_arreglo_entity_1 = require("../../carritos-arreglo/entities/carritos-arreglo.entity");
let Carrito = class Carrito {
    idCarrito;
    idUser;
    fechaCreacion;
    fechaUltAct;
    activo;
    user;
    carritosArreglo;
};
exports.Carrito = Carrito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_carrito' }),
    __metadata("design:type", Number)
], Carrito.prototype, "idCarrito", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_user' }),
    __metadata("design:type", Number)
], Carrito.prototype, "idUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha_creacion', type: 'timestamp' }),
    __metadata("design:type", Date)
], Carrito.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'fecha_ult_act', type: 'timestamp' }),
    __metadata("design:type", Date)
], Carrito.prototype, "fechaUltAct", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Carrito.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.carrito),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", user_entity_1.User)
], Carrito.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => carritos_arreglo_entity_1.CarritosArreglo, carritosArreglo => carritosArreglo.carrito),
    __metadata("design:type", Array)
], Carrito.prototype, "carritosArreglo", void 0);
exports.Carrito = Carrito = __decorate([
    (0, typeorm_1.Entity)('carrito')
], Carrito);
//# sourceMappingURL=carrito.entity.js.map