"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesorioModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const accesorio_service_1 = require("./accesorio.service");
const accesorio_controller_1 = require("./accesorio.controller");
const accesorio_entity_1 = require("./entities/accesorio.entity");
let AccesorioModule = class AccesorioModule {
};
exports.AccesorioModule = AccesorioModule;
exports.AccesorioModule = AccesorioModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([accesorio_entity_1.Accesorio])],
        controllers: [accesorio_controller_1.AccesorioController],
        providers: [accesorio_service_1.AccesorioService],
        exports: [accesorio_service_1.AccesorioService],
    })
], AccesorioModule);
//# sourceMappingURL=accesorio.module.js.map