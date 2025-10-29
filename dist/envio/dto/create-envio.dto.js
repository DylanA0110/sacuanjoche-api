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
exports.CreateEnvioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEnvioDto {
    idPedido;
    idEmpleado;
    estadoEnvio;
    fechaProgramada;
    fechaSalida;
    fechaEntrega;
    origenLat;
    origenLng;
    destinoLat;
    destinoLng;
    costoEnvio;
    observaciones;
}
exports.CreateEnvioDto = CreateEnvioDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del pedido',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEnvioDto.prototype, "idPedido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del empleado responsable del envío',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEnvioDto.prototype, "idEmpleado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado del envío',
        example: 'Programado',
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateEnvioDto.prototype, "estadoEnvio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha programada para el envío',
        example: '2024-01-15T09:00:00Z'
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEnvioDto.prototype, "fechaProgramada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de salida del envío',
        example: '2024-01-15T10:00:00Z',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEnvioDto.prototype, "fechaSalida", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de entrega del envío',
        example: '2024-01-15T14:00:00Z',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEnvioDto.prototype, "fechaEntrega", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitud del origen',
        example: 40.7128
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEnvioDto.prototype, "origenLat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitud del origen',
        example: -74.0060
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEnvioDto.prototype, "origenLng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitud del destino',
        example: 40.7589
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEnvioDto.prototype, "destinoLat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitud del destino',
        example: -73.9851
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEnvioDto.prototype, "destinoLng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Costo del envío',
        example: 10.00
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEnvioDto.prototype, "costoEnvio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Observaciones del envío',
        example: 'Entregar en horario de oficina',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEnvioDto.prototype, "observaciones", void 0);
//# sourceMappingURL=create-envio.dto.js.map