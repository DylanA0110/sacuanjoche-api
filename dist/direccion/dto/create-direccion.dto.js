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
exports.CreateDireccionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDireccionDto {
    formattedAddress;
    country;
    stateProv;
    city;
    neighborhood;
    street;
    houseNumber;
    postalCode;
    referencia;
    lat;
    lng;
    provider;
    placeId;
    accuracy;
    geolocation;
    activo;
}
exports.CreateDireccionDto = CreateDireccionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dirección formateada completa',
        example: '123 Main St, New York, NY 10001, USA'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "formattedAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'País',
        example: 'USA',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado o provincia',
        example: 'New York',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "stateProv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ciudad',
        example: 'New York',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Barrio o colonia',
        example: 'Manhattan',
        maxLength: 100,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Calle',
        example: 'Main Street',
        maxLength: 200
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de casa',
        example: '123',
        maxLength: 20
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "houseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Código postal',
        example: '10001',
        maxLength: 20
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Referencia adicional',
        example: 'Cerca del parque central',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "referencia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Latitud',
        example: 40.7128
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDireccionDto.prototype, "lat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Longitud',
        example: -74.0060
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateDireccionDto.prototype, "lng", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Proveedor de geocodificación',
        example: 'Google Maps',
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del lugar en el proveedor',
        example: 'ChIJd8BlQ2BZwokRAFUEcm_qrcA',
        maxLength: 200,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "placeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precisión de la geocodificación',
        example: 'ROOFTOP',
        maxLength: 50,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "accuracy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Datos de geolocalización adicionales',
        example: '{"accuracy": 10, "timestamp": 1640995200000}',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDireccionDto.prototype, "geolocation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado activo de la dirección',
        example: true,
        default: true,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateDireccionDto.prototype, "activo", void 0);
//# sourceMappingURL=create-direccion.dto.js.map