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
exports.EnvioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const envio_entity_1 = require("./entities/envio.entity");
let EnvioService = class EnvioService {
    envioRepository;
    constructor(envioRepository) {
        this.envioRepository = envioRepository;
    }
    async create(createEnvioDto) {
        const envio = this.envioRepository.create(createEnvioDto);
        return await this.envioRepository.save(envio);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.envioRepository.findAndCount({ take: limit, skip: offset, relations: ['pedido', 'empleado'] });
        return { data, total };
    }
    async findOne(id) {
        const envio = await this.envioRepository.findOne({ where: { idEnvio: id }, relations: ['pedido', 'empleado'] });
        if (!envio)
            throw new common_1.NotFoundException(`Envío con ID ${id} no encontrado`);
        return envio;
    }
    async update(id, updateEnvioDto) {
        const envio = await this.findOne(id);
        Object.assign(envio, updateEnvioDto);
        return await this.envioRepository.save(envio);
    }
    async remove(id) {
        const envio = await this.findOne(id);
        await this.envioRepository.remove(envio);
    }
    async findByEstado(estadoEnvio) {
        return await this.envioRepository.find({ where: { estadoEnvio }, relations: ['pedido', 'empleado'] });
    }
};
exports.EnvioService = EnvioService;
exports.EnvioService = EnvioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(envio_entity_1.Envio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EnvioService);
//# sourceMappingURL=envio.service.js.map