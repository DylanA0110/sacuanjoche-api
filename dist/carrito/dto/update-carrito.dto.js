"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCarritoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_carrito_dto_1 = require("./create-carrito.dto");
class UpdateCarritoDto extends (0, swagger_1.PartialType)(create_carrito_dto_1.CreateCarritoDto) {
}
exports.UpdateCarritoDto = UpdateCarritoDto;
//# sourceMappingURL=update-carrito.dto.js.map