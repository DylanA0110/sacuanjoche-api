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
exports.CreateFacturaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFacturaDto {
    idPedido;
    idEmpleado;
    numFactura;
    estado;
    montoTotal;
}
exports.CreateFacturaDto = CreateFacturaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del pedido',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFacturaDto.prototype, "idPedido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del empleado que emite la factura',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFacturaDto.prototype, "idEmpleado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de factura',
        example: 'FAC-2024-001',
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "numFactura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado de la factura',
        example: 'Emitida',
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateFacturaDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Monto total de la factura',
        example: 150.00
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFacturaDto.prototype, "montoTotal", void 0);
//# sourceMappingURL=create-factura.dto.js.map