import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Carrito } from 'src/carrito/entities/carrito.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEstado } from '../../common/enums';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('text', {
    name: 'email',
    unique: true,
  })
  email: string;

  @Column('text', {
    name: 'password',
    select: false,
  })
  password: string;

  @Column('int', {
    name: 'login_attempts',
    default: 0,
  })
  loginAttempts: number;

  @Column({
    name: 'blocked_until',
    type: 'timestamptz',
    nullable: true,
  })
  blockedUntil: Date | null;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 50,
    enum: UserEstado,
    default: UserEstado.ACTIVO,
  })
  estado: UserEstado;

  @Column('text', {
    name: 'roles',
    array: true,
    default: ['cliente'],
  })
  roles: string[];

  @OneToOne(() => Empleado, (empleado) => empleado.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'empleado_id' })
  empleado?: Empleado;

  @OneToOne(() => Cliente, (cliente) => cliente.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente?: Cliente;

  @OneToOne(() => Carrito, (carrito) => carrito.user, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'carrito_id' })
  carrito?: Carrito;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.email = this.email.toLowerCase().trim();
  }
}
