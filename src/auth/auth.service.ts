import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
import { UserEstado } from 'src/common/enums/user-estado.enum';

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
          'Solo puede asociar el usuario a un cliente o a un empleado, no a ambos.',
        );
      }

      const normalizedEmail = userData.email.toLowerCase().trim();

      const newUser = this.userRepository.create({
        ...userData,
        email: normalizedEmail,
        password: bcrypt.hashSync(password, 10),
      });

      if (clienteId !== undefined) {
        const cliente = await this.clienteRepository.findOne({
          where: { idCliente: clienteId },
        });

        if (!cliente) {
          throw new BadRequestException('El cliente indicado no existe.');
        }

        newUser.cliente = cliente;
      }

      if (empleadoId !== undefined) {
        const empleado = await this.empleadoRepository.findOne({
          where: { idEmpleado: empleadoId },
        });

        if (!empleado) {
          throw new BadRequestException('El empleado indicado no existe.');
        }

        newUser.empleado = empleado;
      }

      await this.userRepository.save(newUser);

      const { password: _password, ...user } = newUser;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: normalizedEmail })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const now = new Date();

    if (user.blockedUntil && user.blockedUntil <= now) {
      await this.userRepository.update(user.id, {
        blockedUntil: null,
        loginAttempts: 0,
      });
      user.blockedUntil = null;
      user.loginAttempts = 0;
    }

    if (user.blockedUntil && user.blockedUntil > now) {
      const remainingMs = user.blockedUntil.getTime() - now.getTime();
      const remainingMinutes = Math.ceil(remainingMs / 60000);

      throw new UnauthorizedException(
        `La cuenta se encuentra bloqueada. Intenta nuevamente en ${remainingMinutes} minuto(s).`,
      );
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      const currentAttempts = (user.loginAttempts ?? 0) + 1;

      if (currentAttempts >= 3) {
        const blockedUntil = new Date(now.getTime() + 15 * 60 * 1000);
        await this.userRepository.update(user.id, {
          blockedUntil,
          loginAttempts: 0,
        });

        throw new UnauthorizedException(
          'La cuenta ha sido bloqueada por múltiples intentos fallidos. Intenta nuevamente en 15 minutos.',
        );
      }

      await this.userRepository.update(user.id, {
        loginAttempts: currentAttempts,
      });

      const attemptsLeft = 3 - currentAttempts;
      throw new UnauthorizedException(
        `Credenciales inválidas. Intentos restantes: ${attemptsLeft}.`,
      );
    }

    if (user.estado !== UserEstado.ACTIVO) {
      throw new UnauthorizedException('El usuario se encuentra inactivo.');
    }

    if ((user.loginAttempts ?? 0) !== 0 || user.blockedUntil) {
      await this.userRepository.update(user.id, {
        loginAttempts: 0,
        blockedUntil: null,
      });
    }

    user.loginAttempts = 0;
    user.blockedUntil = null;

    const { password: _password, ...rest } = user;

    return {
      ...rest,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async checkAuthStatus(user: User) {
    const dbUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!dbUser) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }

    const { password: _password, ...rest } = dbUser;

    return {
      ...rest,
      token: this.getJwtToken({ id: dbUser.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleDbErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    if (error instanceof BadRequestException) {
      throw error;
    }

    throw new InternalServerErrorException(
      'Error inesperado, verifica los logs del servidor.',
    );
  }

  async updateUserRoles(userId: string, { roles }: UpdateUserRolesDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('El usuario no existe.');
    }

    const uniqueRoles = Array.from(new Set(roles));
    user.roles = uniqueRoles;

    await this.userRepository.save(user);

    const { password: _password, ...rest } = user;

    return {
      ...rest,
      token: this.getJwtToken({ id: user.id }),
    };
  }
}
