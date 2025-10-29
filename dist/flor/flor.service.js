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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const flor_entity_1 = require("./entities/flor.entity");
let FlorService = class FlorService {
    florRepository;
    constructor(florRepository) {
        this.florRepository = florRepository;
    }
    async create(createFlorDto) {
        const flor = this.florRepository.create(createFlorDto);
        return await this.florRepository.save(flor);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.florRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['arreglosFlor'],
        });
        return { data, total };
    }
    async findOne(id) {
        const flor = await this.florRepository.findOne({
            where: { idFlor: id },
            relations: ['arreglosFlor'],
        });
        if (!flor) {
            throw new common_1.NotFoundException(`Flor con ID ${id} no encontrada`);
        }
        return flor;
    }
    async update(id, updateFlorDto) {
        const flor = await this.findOne(id);
        Object.assign(flor, updateFlorDto);
        return await this.florRepository.save(flor);
    }
    async remove(id) {
        const flor = await this.findOne(id);
        await this.florRepository.remove(flor);
    }
    async findByTipo(tipo) {
        return await this.florRepository.find({
            where: { tipo, activo: true },
        });
    }
    async findByColor(color) {
        return await this.florRepository.find({
            where: { color, activo: true },
        });
    }
    async findActiveFlowers() {
        return await this.florRepository.find({
            where: { activo: true },
        });
    }
};
exports.FlorService = FlorService;
exports.FlorService = FlorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(flor_entity_1.Flor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FlorService);
//# sourceMappingURL=flor.service.js.map