"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactoEntregaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contacto_entrega_service_1 = require("./contacto-entrega.service");
const contacto_entrega_controller_1 = require("./contacto-entrega.controller");
const contacto_entrega_entity_1 = require("./entities/contacto-entrega.entity");
let ContactoEntregaModule = class ContactoEntregaModule {
};
exports.ContactoEntregaModule = ContactoEntregaModule;
exports.ContactoEntregaModule = ContactoEntregaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([contacto_entrega_entity_1.ContactoEntrega])],
        controllers: [contacto_entrega_controller_1.ContactoEntregaController],
        providers: [contacto_entrega_service_1.ContactoEntregaService],
        exports: [contacto_entrega_service_1.ContactoEntregaService],
    })
], ContactoEntregaModule);
//# sourceMappingURL=contacto-entrega.module.js.map