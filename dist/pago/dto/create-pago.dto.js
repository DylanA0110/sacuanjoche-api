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
exports.CreatePagoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePagoDto {
    idPedido;
    idMetodoPago;
    monto;
    estado;
    referencia;
    gateway;
    idGateway;
    paymentUrlExt;
    rawPayload;
}
exports.CreatePagoDto = CreatePagoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del pedido',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "idPedido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del método de pago',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "idMetodoPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Monto del pago',
        example: 150.00
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "monto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado del pago',
        example: 'Pendiente',
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Referencia del pago',
        example: 'PAY-123456789',
        maxLength: 200,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "referencia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gateway de pago utilizado',
        example: 'PayPal',
        maxLength: 100,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "gateway", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del pago en el gateway',
        example: 'PAYID-123456789',
        maxLength: 200,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "idGateway", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL externa de pago',
        example: 'https://paypal.com/pay/123456789',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "paymentUrlExt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payload crudo del gateway',
        example: '{"id": "PAYID-123456789", "status": "COMPLETED"}',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "rawPayload", void 0);
//# sourceMappingURL=create-pago.dto.js.map