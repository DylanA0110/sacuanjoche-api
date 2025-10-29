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
exports.CreateArregloDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateArregloDto {
    idFormaArreglo;
    nombre;
    descripcion;
    precioUnitario;
    cantidadFlores;
    activo;
}
exports.CreateArregloDto = CreateArregloDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la forma de arreglo',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateArregloDto.prototype, "idFormaArreglo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del arreglo',
        example: 'Ramo de Rosas Rojas',
        maxLength: 200
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateArregloDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Descripción del arreglo',
        example: 'Hermoso ramo de rosas rojas para ocasiones especiales',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateArregloDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precio unitario del arreglo',
        example: 25.99
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateArregloDto.prototype, "precioUnitario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad de flores en el arreglo',
        example: 12
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateArregloDto.prototype, "cantidadFlores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Estado activo del arreglo',
        example: true,
        default: true,
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateArregloDto.prototype, "activo", void 0);
//# sourceMappingURL=create-arreglo.dto.js.map