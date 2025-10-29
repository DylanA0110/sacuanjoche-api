"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoHistorialModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pedido_historial_service_1 = require("./pedido-historial.service");
const pedido_historial_controller_1 = require("./pedido-historial.controller");
const pedido_historial_entity_1 = require("./entities/pedido-historial.entity");
let PedidoHistorialModule = class PedidoHistorialModule {
};
exports.PedidoHistorialModule = PedidoHistorialModule;
exports.PedidoHistorialModule = PedidoHistorialModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pedido_historial_entity_1.PedidoHistorial])],
        controllers: [pedido_historial_controller_1.PedidoHistorialController],
        providers: [pedido_historial_service_1.PedidoHistorialService],
        exports: [pedido_historial_service_1.PedidoHistorialService],
    })
], PedidoHistorialModule);
//# sourceMappingURL=pedido-historial.module.js.map