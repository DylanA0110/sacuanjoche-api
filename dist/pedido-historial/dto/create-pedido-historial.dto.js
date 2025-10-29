"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePedidoHistorialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePedidoHistorialDto {
    idPedido;
    idEmpleado;
    estado;
    nota;
}
exports.CreatePedidoHistorialDto = CreatePedidoHistorialDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del pedido',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePedidoHistorialDto.prototype, "idPedido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del empleado que realiza el cambio',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePedidoHistorialDto.prototype, "idEmpleado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado del pedido',
        example: 'En Proceso',
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreatePedidoHistorialDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nota sobre el cambio de estado',
        example: 'Pedido confirmado y en preparación',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePedidoHistorialDto.prototype, "nota", void 0);
//# sourceMappingURL=create-pedido-historial.dto.js.map