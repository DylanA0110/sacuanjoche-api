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
exports.CreateClienteDireccionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateClienteDireccionDto {
    idCliente;
    idDireccion;
    etiqueta;
    esPredeterminada;
    activo;
}
exports.CreateClienteDireccionDto = CreateClienteDireccionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del cliente',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateClienteDireccionDto.prototype, "idCliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la dirección',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateClienteDireccionDto.prototype, "idDireccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Etiqueta para identificar la dirección',
        example: 'Casa',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateClienteDireccionDto.prototype, "etiqueta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Si es la dirección predeterminada',
        example: true,
        default: false,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateClienteDireccionDto.prototype, "esPredeterminada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado activo de la dirección del cliente',
        example: true,
        default: true,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateClienteDireccionDto.prototype, "activo", void 0);
//# sourceMappingURL=create-cliente-direccion.dto.js.map