import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {}

  async login(loginUserDto: LoginUserDto) {}

  async checkAuthStatus(user: User) {}

  private getJwtToken(payload: JwtPayload) {}

  private handleDbErrors(error: any) {}

  async updateUserRoles(userId: string, { roles }: UpdateUserRolesDto) {}
}
