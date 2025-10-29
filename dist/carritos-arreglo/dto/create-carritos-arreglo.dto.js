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
exports.CreateCarritosArregloDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCarritosArregloDto {
    idCarrito;
    idArreglo;
    cantidad;
    precioUnitario;
    totalLinea;
}
exports.CreateCarritosArregloDto = CreateCarritosArregloDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del carrito',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCarritosArregloDto.prototype, "idCarrito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del arreglo',
        example: 1
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCarritosArregloDto.prototype, "idArreglo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad del arreglo en el carrito',
        example: 2
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCarritosArregloDto.prototype, "cantidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Precio unitario del arreglo',
        example: 25.99
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCarritosArregloDto.prototype, "precioUnitario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total de la línea (cantidad × precio unitario)',
        example: 51.98
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCarritosArregloDto.prototype, "totalLinea", void 0);
//# sourceMappingURL=create-carritos-arreglo.dto.js.map