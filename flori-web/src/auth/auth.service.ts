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

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, clienteId, empleadoId, ...userData } = createUserDto;

      if (clienteId && empleadoId) {
        throw new BadRequestException(
          'Un usuario no puede estar vinculado a cliente y empleado a la vez',
        );
      }

      let cliente: Cliente | undefined = undefined;
      let empleado: Empleado | undefined = undefined;

      if (clienteId) {
        const clienteEntity = await this.clienteRepository.findOne({
          where: { idCliente: clienteId },
        });
        if (!clienteEntity) {
          throw new BadRequestException(
            `Cliente con id ${clienteId} no existe`,
          );
        }
        cliente = clienteEntity;
      }

      if (empleadoId) {
        const empleadoEntity = await this.empleadoRepository.findOne({
          where: { idEmpleado: empleadoId },
        });
        if (!empleadoEntity) {
          throw new BadRequestException(
            `Empleado con id ${empleadoId} no existe`,
          );
        }
        empleado = empleadoEntity;
      }

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        cliente,
        empleado,
      });

      await this.userRepository.save(user);

      // Ensure password is not exposed in the response
      delete (user as any).password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;

      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true, roles: true },
        relations: ['cliente', 'empleado'],
      });

      if (!user) throw new UnauthorizedException('Credentials are not valid');

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      const payload = {
        sub: user.id,
        roles: user.roles,
        empleadoId: user.empleado?.idEmpleado ?? null,
        clienteId: user.cliente?.idCliente ?? null,
      };

      //console.log({user});
      // return {
      //   ...user,
      //   token: this.getJwtToken({ id: user.id }),
      // };

      return {
        id: user.id,
        email: user.email,
        roles: user.roles,
        empleado: user.empleado
          ? {
              id: user.empleado.idEmpleado,
              nombreCompleto: `${user.empleado.primerNombre} ${user.empleado.primerApellido}`,
            }
          : null,
        cliente: user.cliente
          ? {
              id: user.cliente.idCliente,
              nombreCompleto: `${user.cliente.primerNombre} ${user.cliente.primerApellido}`,
            }
          : null,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDbErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    console.log(error);

    throw new InternalServerErrorException('Please check servers logs');
  }

  async updateUserRoles(userId: string, { roles }: UpdateUserRolesDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user)
      throw new BadRequestException(`Usuario con id ${userId} no existe`);

    // Ensure unique roles and preserve only valid ones
    user.roles = Array.from(new Set(roles));

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
      isActive: user.isActive,
    };
  }
}
