"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetodoPagoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const metodo_pago_service_1 = require("./metodo-pago.service");
const metodo_pago_controller_1 = require("./metodo-pago.controller");
const metodo_pago_entity_1 = require("./entities/metodo-pago.entity");
let MetodoPagoModule = class MetodoPagoModule {
};
exports.MetodoPagoModule = MetodoPagoModule;
exports.MetodoPagoModule = MetodoPagoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([metodo_pago_entity_1.MetodoPago])],
        controllers: [metodo_pago_controller_1.MetodoPagoController],
        providers: [metodo_pago_service_1.MetodoPagoService],
        exports: [metodo_pago_service_1.MetodoPagoService],
    })
], MetodoPagoModule);
//# sourceMappingURL=metodo-pago.module.js.map