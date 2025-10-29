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
exports.CarritoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const carrito_entity_1 = require("./entities/carrito.entity");
let CarritoService = class CarritoService {
    carritoRepository;
    constructor(carritoRepository) {
        this.carritoRepository = carritoRepository;
    }
    async create(createCarritoDto) {
        const carrito = this.carritoRepository.create(createCarritoDto);
        return await this.carritoRepository.save(carrito);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.carritoRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['user', 'carritosArreglo'],
        });
        return { data, total };
    }
    async findOne(id) {
        const carrito = await this.carritoRepository.findOne({
            where: { idCarrito: id },
            relations: ['user', 'carritosArreglo'],
        });
        if (!carrito) {
            throw new common_1.NotFoundException(`Carrito con ID ${id} no encontrado`);
        }
        return carrito;
    }
    async update(id, updateCarritoDto) {
        const carrito = await this.findOne(id);
        Object.assign(carrito, updateCarritoDto);
        return await this.carritoRepository.save(carrito);
    }
    async remove(id) {
        const carrito = await this.findOne(id);
        await this.carritoRepository.remove(carrito);
    }
    async findByUser(idUser) {
        return await this.carritoRepository.findOne({
            where: { idUser, activo: true },
            relations: ['user', 'carritosArreglo'],
        });
    }
    async findActiveCarritos() {
        return await this.carritoRepository.find({
            where: { activo: true },
            relations: ['user'],
        });
    }
};
exports.CarritoService = CarritoService;
exports.CarritoService = CarritoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(carrito_entity_1.Carrito)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CarritoService);
//# sourceMappingURL=carrito.service.js.map