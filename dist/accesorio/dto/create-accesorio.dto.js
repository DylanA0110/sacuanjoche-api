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
exports.CreateAccesorioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAccesorioDto {
    descripcion;
    precioUnitario;
    activo;
    categoria;
}
exports.CreateAccesorioDto = CreateAccesorioDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción del accesorio',
        example: 'Cinta decorativa dorada',
        maxLength: 200
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateAccesorioDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precio unitario del accesorio',
        example: 2.50
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAccesorioDto.prototype, "precioUnitario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado activo del accesorio',
        example: true,
        default: true,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAccesorioDto.prototype, "activo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Categoría del accesorio',
        example: 'Decoración',
        maxLength: 100
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateAccesorioDto.prototype, "categoria", void 0);
//# sourceMappingURL=create-accesorio.dto.js.map