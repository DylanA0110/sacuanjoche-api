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
exports.AccesorioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const accesorio_entity_1 = require("./entities/accesorio.entity");
let AccesorioService = class AccesorioService {
    accesorioRepository;
    constructor(accesorioRepository) {
        this.accesorioRepository = accesorioRepository;
    }
    async create(createAccesorioDto) {
        const accesorio = this.accesorioRepository.create(createAccesorioDto);
        return await this.accesorioRepository.save(accesorio);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.accesorioRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['accesoriosArreglo'],
        });
        return { data, total };
    }
    async findOne(id) {
        const accesorio = await this.accesorioRepository.findOne({
            where: { idAccesorio: id },
            relations: ['accesoriosArreglo'],
        });
        if (!accesorio) {
            throw new common_1.NotFoundException(`Accesorio con ID ${id} no encontrado`);
        }
        return accesorio;
    }
    async update(id, updateAccesorioDto) {
        const accesorio = await this.findOne(id);
        Object.assign(accesorio, updateAccesorioDto);
        return await this.accesorioRepository.save(accesorio);
    }
    async remove(id) {
        const accesorio = await this.findOne(id);
        await this.accesorioRepository.remove(accesorio);
    }
    async findByCategoria(categoria) {
        return await this.accesorioRepository.find({
            where: { categoria, activo: true },
        });
    }
    async findActiveAccesorios() {
        return await this.accesorioRepository.find({
            where: { activo: true },
        });
    }
};
exports.AccesorioService = AccesorioService;
exports.AccesorioService = AccesorioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(accesorio_entity_1.Accesorio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccesorioService);
//# sourceMappingURL=accesorio.service.js.map