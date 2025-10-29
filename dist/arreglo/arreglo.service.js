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
exports.ArregloService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const arreglo_entity_1 = require("./entities/arreglo.entity");
let ArregloService = class ArregloService {
    arregloRepository;
    constructor(arregloRepository) {
        this.arregloRepository = arregloRepository;
    }
    async create(createArregloDto) {
        const arreglo = this.arregloRepository.create(createArregloDto);
        return await this.arregloRepository.save(arreglo);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.arregloRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['formaArreglo', 'arreglosFlor', 'accesoriosArreglo', 'carritosArreglo', 'detallesPedido'],
        });
        return { data, total };
    }
    async findOne(id) {
        const arreglo = await this.arregloRepository.findOne({
            where: { idArreglo: id },
            relations: ['formaArreglo', 'arreglosFlor', 'accesoriosArreglo', 'carritosArreglo', 'detallesPedido'],
        });
        if (!arreglo) {
            throw new common_1.NotFoundException(`Arreglo con ID ${id} no encontrado`);
        }
        return arreglo;
    }
    async update(id, updateArregloDto) {
        const arreglo = await this.findOne(id);
        Object.assign(arreglo, updateArregloDto);
        return await this.arregloRepository.save(arreglo);
    }
    async remove(id) {
        const arreglo = await this.findOne(id);
        await this.arregloRepository.remove(arreglo);
    }
    async findByFormaArreglo(idFormaArreglo) {
        return await this.arregloRepository.find({
            where: { idFormaArreglo, activo: true },
            relations: ['formaArreglo'],
        });
    }
    async findActiveArreglos() {
        return await this.arregloRepository.find({
            where: { activo: true },
            relations: ['formaArreglo'],
        });
    }
    async findByPriceRange(minPrice, maxPrice) {
        return await this.arregloRepository
            .createQueryBuilder('arreglo')
            .where('arreglo.precioUnitario BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice })
            .andWhere('arreglo.activo = :activo', { activo: true })
            .leftJoinAndSelect('arreglo.formaArreglo', 'formaArreglo')
            .getMany();
    }
};
exports.ArregloService = ArregloService;
exports.ArregloService = ArregloService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(arreglo_entity_1.Arreglo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArregloService);
//# sourceMappingURL=arreglo.service.js.map