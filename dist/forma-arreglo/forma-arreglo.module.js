"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormaArregloModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const forma_arreglo_service_1 = require("./forma-arreglo.service");
const forma_arreglo_controller_1 = require("./forma-arreglo.controller");
const forma_arreglo_entity_1 = require("./entities/forma-arreglo.entity");
let FormaArregloModule = class FormaArregloModule {
};
exports.FormaArregloModule = FormaArregloModule;
exports.FormaArregloModule = FormaArregloModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([forma_arreglo_entity_1.FormaArreglo])],
        controllers: [forma_arreglo_controller_1.FormaArregloController],
        providers: [forma_arreglo_service_1.FormaArregloService],
        exports: [forma_arreglo_service_1.FormaArregloService],
    })
], FormaArregloModule);
//# sourceMappingURL=forma-arreglo.module.js.map