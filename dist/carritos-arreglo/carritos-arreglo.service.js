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
exports.CarritosArregloService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const carritos_arreglo_entity_1 = require("./entities/carritos-arreglo.entity");
let CarritosArregloService = class CarritosArregloService {
    carritosArregloRepository;
    constructor(carritosArregloRepository) {
        this.carritosArregloRepository = carritosArregloRepository;
    }
    async create(createCarritosArregloDto) {
        const carritosArreglo = this.carritosArregloRepository.create(createCarritosArregloDto);
        return await this.carritosArregloRepository.save(carritosArreglo);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.carritosArregloRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['carrito', 'arreglo'],
        });
        return { data, total };
    }
    async findOne(id) {
        const carritosArreglo = await this.carritosArregloRepository.findOne({
            where: { idCarritoArreglo: id },
            relations: ['carrito', 'arreglo'],
        });
        if (!carritosArreglo) {
            throw new common_1.NotFoundException(`Carrito arreglo con ID ${id} no encontrado`);
        }
        return carritosArreglo;
    }
    async update(id, updateCarritosArregloDto) {
        const carritosArreglo = await this.findOne(id);
        Object.assign(carritosArreglo, updateCarritosArregloDto);
        return await this.carritosArregloRepository.save(carritosArreglo);
    }
    async remove(id) {
        const carritosArreglo = await this.findOne(id);
        await this.carritosArregloRepository.remove(carritosArreglo);
    }
    async findByCarrito(idCarrito) {
        return await this.carritosArregloRepository.find({
            where: { idCarrito },
            relations: ['carrito', 'arreglo'],
        });
    }
    async findByArreglo(idArreglo) {
        return await this.carritosArregloRepository.find({
            where: { idArreglo },
            relations: ['carrito', 'arreglo'],
        });
    }
};
exports.CarritosArregloService = CarritosArregloService;
exports.CarritosArregloService = CarritosArregloService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(carritos_arreglo_entity_1.CarritosArreglo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CarritosArregloService);
//# sourceMappingURL=carritos-arreglo.service.js.map