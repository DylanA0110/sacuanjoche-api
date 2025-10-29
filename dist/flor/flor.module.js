"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlorModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const flor_service_1 = require("./flor.service");
const flor_controller_1 = require("./flor.controller");
const flor_entity_1 = require("./entities/flor.entity");
let FlorModule = class FlorModule {
};
exports.FlorModule = FlorModule;
exports.FlorModule = FlorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([flor_entity_1.Flor])],
        controllers: [flor_controller_1.FlorController],
        providers: [flor_service_1.FlorService],
        exports: [flor_service_1.FlorService],
    })
], FlorModule);
//# sourceMappingURL=flor.module.js.map