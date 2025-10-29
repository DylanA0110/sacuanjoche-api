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
exports.ArregloFlorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const arreglo_flor_entity_1 = require("./entities/arreglo-flor.entity");
let ArregloFlorService = class ArregloFlorService {
    arregloFlorRepository;
    constructor(arregloFlorRepository) {
        this.arregloFlorRepository = arregloFlorRepository;
    }
    async create(createArregloFlorDto) {
        const arregloFlor = this.arregloFlorRepository.create(createArregloFlorDto);
        return await this.arregloFlorRepository.save(arregloFlor);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.arregloFlorRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['arreglo', 'flor'],
        });
        return { data, total };
    }
    async findOne(id) {
        const arregloFlor = await this.arregloFlorRepository.findOne({
            where: { idArregloFlor: id },
            relations: ['arreglo', 'flor'],
        });
        if (!arregloFlor) {
            throw new common_1.NotFoundException(`Arreglo flor con ID ${id} no encontrado`);
        }
        return arregloFlor;
    }
    async update(id, updateArregloFlorDto) {
        const arregloFlor = await this.findOne(id);
        Object.assign(arregloFlor, updateArregloFlorDto);
        return await this.arregloFlorRepository.save(arregloFlor);
    }
    async remove(id) {
        const arregloFlor = await this.findOne(id);
        await this.arregloFlorRepository.remove(arregloFlor);
    }
    async findByArreglo(idArreglo) {
        return await this.arregloFlorRepository.find({
            where: { idArreglo },
            relations: ['arreglo', 'flor'],
        });
    }
    async findByFlor(idFlor) {
        return await this.arregloFlorRepository.find({
            where: { idFlor },
            relations: ['arreglo', 'flor'],
        });
    }
};
exports.ArregloFlorService = ArregloFlorService;
exports.ArregloFlorService = ArregloFlorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(arreglo_flor_entity_1.ArregloFlor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArregloFlorService);
//# sourceMappingURL=arreglo-flor.service.js.map