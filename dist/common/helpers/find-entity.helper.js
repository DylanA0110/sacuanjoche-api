"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEntityOrFail = findEntityOrFail;
const common_1 = require("@nestjs/common");
async function findEntityOrFail(repository, where, errorMessage) {
    const record = await repository.findOne({ where });
    if (!record) {
        throw new common_1.NotFoundException(errorMessage ?? `Record not found.`);
    }
    return record;
}
//# sourceMappingURL=find-entity.helper.js.map