"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDbException = handleDbException;
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('DbException');
function handleDbException(error) {
    if (error.code === '23505') {
        throw new common_1.BadRequestException(error.detail);
    }
    logger.error(error);
    throw new common_1.InternalServerErrorException('Unexpected error, check server logs');
}
//# sourceMappingURL=db-exception.helper.js.map