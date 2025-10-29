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
exports.ClienteDireccionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cliente_direccion_entity_1 = require("./entities/cliente-direccion.entity");
let ClienteDireccionService = class ClienteDireccionService {
    clienteDireccionRepository;
    constructor(clienteDireccionRepository) {
        this.clienteDireccionRepository = clienteDireccionRepository;
    }
    async create(createClienteDireccionDto) {
        const clienteDireccion = this.clienteDireccionRepository.create(createClienteDireccionDto);
        return await this.clienteDireccionRepository.save(clienteDireccion);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.clienteDireccionRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['cliente', 'direccion'],
        });
        return { data, total };
    }
    async findOne(id) {
        const clienteDireccion = await this.clienteDireccionRepository.findOne({
            where: { idClienteDireccion: id },
            relations: ['cliente', 'direccion'],
        });
        if (!clienteDireccion) {
            throw new common_1.NotFoundException(`Cliente dirección con ID ${id} no encontrada`);
        }
        return clienteDireccion;
    }
    async update(id, updateClienteDireccionDto) {
        const clienteDireccion = await this.findOne(id);
        Object.assign(clienteDireccion, updateClienteDireccionDto);
        return await this.clienteDireccionRepository.save(clienteDireccion);
    }
    async remove(id) {
        const clienteDireccion = await this.findOne(id);
        await this.clienteDireccionRepository.remove(clienteDireccion);
    }
    async findByCliente(idCliente) {
        return await this.clienteDireccionRepository.find({
            where: { idCliente, activo: true },
            relations: ['cliente', 'direccion'],
        });
    }
    async findPredeterminadaByCliente(idCliente) {
        return await this.clienteDireccionRepository.findOne({
            where: { idCliente, esPredeterminada: true, activo: true },
            relations: ['cliente', 'direccion'],
        });
    }
};
exports.ClienteDireccionService = ClienteDireccionService;
exports.ClienteDireccionService = ClienteDireccionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cliente_direccion_entity_1.ClienteDireccion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClienteDireccionService);
//# sourceMappingURL=cliente-direccion.service.js.map