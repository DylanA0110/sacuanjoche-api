"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArregloModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const arreglo_service_1 = require("./arreglo.service");
const arreglo_controller_1 = require("./arreglo.controller");
const arreglo_entity_1 = require("./entities/arreglo.entity");
let ArregloModule = class ArregloModule {
};
exports.ArregloModule = ArregloModule;
exports.ArregloModule = ArregloModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([arreglo_entity_1.Arreglo])],
        controllers: [arreglo_controller_1.ArregloController],
        providers: [arreglo_service_1.ArregloService],
        exports: [arreglo_service_1.ArregloService],
    })
], ArregloModule);
//# sourceMappingURL=arreglo.module.js.map