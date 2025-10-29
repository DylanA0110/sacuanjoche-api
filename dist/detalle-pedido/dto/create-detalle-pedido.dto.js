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
exports.CreateDetallePedidoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDetallePedidoDto {
    idPedido;
    idArreglo;
    cantidad;
    precioUnitario;
    subtotal;
}
exports.CreateDetallePedidoDto = CreateDetallePedidoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del pedido',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetallePedidoDto.prototype, "idPedido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del arreglo',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetallePedidoDto.prototype, "idArreglo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad del arreglo',
        example: 2
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetallePedidoDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precio unitario del arreglo',
        example: 25.99
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetallePedidoDto.prototype, "precioUnitario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subtotal (cantidad × precio unitario)',
        example: 51.98
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDetallePedidoDto.prototype, "subtotal", void 0);
//# sourceMappingURL=create-detalle-pedido.dto.js.map