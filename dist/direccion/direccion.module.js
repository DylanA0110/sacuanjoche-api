"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DireccionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const direccion_service_1 = require("./direccion.service");
const direccion_controller_1 = require("./direccion.controller");
const direccion_entity_1 = require("./entities/direccion.entity");
let DireccionModule = class DireccionModule {
};
exports.DireccionModule = DireccionModule;
exports.DireccionModule = DireccionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([direccion_entity_1.Direccion])],
        controllers: [direccion_controller_1.DireccionController],
        providers: [direccion_service_1.DireccionService],
        exports: [direccion_service_1.DireccionService],
    })
], DireccionModule);
//# sourceMappingURL=direccion.module.js.map