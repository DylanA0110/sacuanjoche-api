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
exports.AccesoriosArregloService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const accesorios_arreglo_entity_1 = require("./entities/accesorios-arreglo.entity");
let AccesoriosArregloService = class AccesoriosArregloService {
    accesoriosArregloRepository;
    constructor(accesoriosArregloRepository) {
        this.accesoriosArregloRepository = accesoriosArregloRepository;
    }
    async create(createAccesoriosArregloDto) {
        const accesoriosArreglo = this.accesoriosArregloRepository.create(createAccesoriosArregloDto);
        return await this.accesoriosArregloRepository.save(accesoriosArreglo);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.accesoriosArregloRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['accesorio', 'arreglo'],
        });
        return { data, total };
    }
    async findOne(id) {
        const accesoriosArreglo = await this.accesoriosArregloRepository.findOne({
            where: { idAccesorioArreglo: id },
            relations: ['accesorio', 'arreglo'],
        });
        if (!accesoriosArreglo) {
            throw new common_1.NotFoundException(`Accesorios arreglo con ID ${id} no encontrado`);
        }
        return accesoriosArreglo;
    }
    async update(id, updateAccesoriosArregloDto) {
        const accesoriosArreglo = await this.findOne(id);
        Object.assign(accesoriosArreglo, updateAccesoriosArregloDto);
        return await this.accesoriosArregloRepository.save(accesoriosArreglo);
    }
    async remove(id) {
        const accesoriosArreglo = await this.findOne(id);
        await this.accesoriosArregloRepository.remove(accesoriosArreglo);
    }
    async findByAccesorio(idAccesorio) {
        return await this.accesoriosArregloRepository.find({
            where: { idAccesorio },
            relations: ['accesorio', 'arreglo'],
        });
    }
    async findByArreglo(idArreglo) {
        return await this.accesoriosArregloRepository.find({
            where: { idArreglo },
            relations: ['accesorio', 'arreglo'],
        });
    }
};
exports.AccesoriosArregloService = AccesoriosArregloService;
exports.AccesoriosArregloService = AccesoriosArregloService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(accesorios_arreglo_entity_1.AccesoriosArreglo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccesoriosArregloService);
//# sourceMappingURL=accesorios-arreglo.service.js.map