"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDireccionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_direccion_dto_1 = require("./create-direccion.dto");
class UpdateDireccionDto extends (0, swagger_1.PartialType)(create_direccion_dto_1.CreateDireccionDto) {
}
exports.UpdateDireccionDto = UpdateDireccionDto;
//# sourceMappingURL=update-direccion.dto.js.map