"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritosArregloModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const carritos_arreglo_service_1 = require("./carritos-arreglo.service");
const carritos_arreglo_controller_1 = require("./carritos-arreglo.controller");
const carritos_arreglo_entity_1 = require("./entities/carritos-arreglo.entity");
let CarritosArregloModule = class CarritosArregloModule {
};
exports.CarritosArregloModule = CarritosArregloModule;
exports.CarritosArregloModule = CarritosArregloModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([carritos_arreglo_entity_1.CarritosArreglo])],
        controllers: [carritos_arreglo_controller_1.CarritosArregloController],
        providers: [carritos_arreglo_service_1.CarritosArregloService],
        exports: [carritos_arreglo_service_1.CarritosArregloService],
    })
], CarritosArregloModule);
//# sourceMappingURL=carritos-arreglo.module.js.map