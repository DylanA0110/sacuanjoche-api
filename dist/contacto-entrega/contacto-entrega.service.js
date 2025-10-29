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
exports.ContactoEntregaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contacto_entrega_entity_1 = require("./entities/contacto-entrega.entity");
let ContactoEntregaService = class ContactoEntregaService {
    contactoEntregaRepository;
    constructor(contactoEntregaRepository) {
        this.contactoEntregaRepository = contactoEntregaRepository;
    }
    async create(createContactoEntregaDto) {
        const contactoEntrega = this.contactoEntregaRepository.create(createContactoEntregaDto);
        return await this.contactoEntregaRepository.save(contactoEntrega);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const [data, total] = await this.contactoEntregaRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['pedidos'],
        });
        return { data, total };
    }
    async findOne(id) {
        const contactoEntrega = await this.contactoEntregaRepository.findOne({
            where: { idContactoEntrega: id },
            relations: ['pedidos'],
        });
        if (!contactoEntrega) {
            throw new common_1.NotFoundException(`Contacto de entrega con ID ${id} no encontrado`);
        }
        return contactoEntrega;
    }
    async update(id, updateContactoEntregaDto) {
        const contactoEntrega = await this.findOne(id);
        Object.assign(contactoEntrega, updateContactoEntregaDto);
        return await this.contactoEntregaRepository.save(contactoEntrega);
    }
    async remove(id) {
        const contactoEntrega = await this.findOne(id);
        await this.contactoEntregaRepository.remove(contactoEntrega);
    }
    async findByTelefono(telefono) {
        return await this.contactoEntregaRepository.find({
            where: { telefono },
            relations: ['pedidos'],
        });
    }
};
exports.ContactoEntregaService = ContactoEntregaService;
exports.ContactoEntregaService = ContactoEntregaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contacto_entrega_entity_1.ContactoEntrega)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactoEntregaService);
//# sourceMappingURL=contacto-entrega.service.js.map