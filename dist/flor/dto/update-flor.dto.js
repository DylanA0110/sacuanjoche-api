"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFlorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_flor_dto_1 = require("./create-flor.dto");
class UpdateFlorDto extends (0, swagger_1.PartialType)(create_flor_dto_1.CreateFlorDto) {
}
exports.UpdateFlorDto = UpdateFlorDto;
//# sourceMappingURL=update-flor.dto.js.map