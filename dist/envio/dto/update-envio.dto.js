"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEnvioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_envio_dto_1 = require("./create-envio.dto");
class UpdateEnvioDto extends (0, swagger_1.PartialType)(create_envio_dto_1.CreateEnvioDto) {
}
exports.UpdateEnvioDto = UpdateEnvioDto;
//# sourceMappingURL=update-envio.dto.js.map