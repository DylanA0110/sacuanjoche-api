"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesoriosArregloModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const accesorios_arreglo_service_1 = require("./accesorios-arreglo.service");
const accesorios_arreglo_controller_1 = require("./accesorios-arreglo.controller");
const accesorios_arreglo_entity_1 = require("./entities/accesorios-arreglo.entity");
let AccesoriosArregloModule = class AccesoriosArregloModule {
};
exports.AccesoriosArregloModule = AccesoriosArregloModule;
exports.AccesoriosArregloModule = AccesoriosArregloModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([accesorios_arreglo_entity_1.AccesoriosArreglo])],
        controllers: [accesorios_arreglo_controller_1.AccesoriosArregloController],
        providers: [accesorios_arreglo_service_1.AccesoriosArregloService],
        exports: [accesorios_arreglo_service_1.AccesoriosArregloService],
    })
], AccesoriosArregloModule);
//# sourceMappingURL=accesorios-arreglo.module.js.map