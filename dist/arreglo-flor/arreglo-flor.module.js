"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArregloFlorModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const arreglo_flor_service_1 = require("./arreglo-flor.service");
const arreglo_flor_controller_1 = require("./arreglo-flor.controller");
const arreglo_flor_entity_1 = require("./entities/arreglo-flor.entity");
let ArregloFlorModule = class ArregloFlorModule {
};
exports.ArregloFlorModule = ArregloFlorModule;
exports.ArregloFlorModule = ArregloFlorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([arreglo_flor_entity_1.ArregloFlor])],
        controllers: [arreglo_flor_controller_1.ArregloFlorController],
        providers: [arreglo_flor_service_1.ArregloFlorService],
        exports: [arreglo_flor_service_1.ArregloFlorService],
    })
], ArregloFlorModule);
//# sourceMappingURL=arreglo-flor.module.js.map