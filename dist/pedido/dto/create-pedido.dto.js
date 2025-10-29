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
exports.CreatePedidoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePedidoDto {
    idEmpleado;
    idCliente;
    idDireccion;
    idContactoEntrega;
    totalProductos;
    fechaEntregaEstimada;
    direccionTxt;
    costoEnvio;
    totalPedido;
}
exports.CreatePedidoDto = CreatePedidoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del empleado que procesa el pedido',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "idEmpleado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del cliente',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "idCliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la dirección de entrega',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "idDireccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del contacto de entrega',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "idContactoEntrega", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total de productos en el pedido',
        example: 75.50
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "totalProductos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha estimada de entrega',
        example: '2024-01-15T10:00:00Z'
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePedidoDto.prototype, "fechaEntregaEstimada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dirección de entrega en texto',
        example: '123 Main St, New York, NY 10001'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePedidoDto.prototype, "direccionTxt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Costo de envío',
        example: 10.00
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "costoEnvio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total del pedido',
        example: 85.50
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePedidoDto.prototype, "totalPedido", void 0);
//# sourceMappingURL=create-pedido.dto.js.map