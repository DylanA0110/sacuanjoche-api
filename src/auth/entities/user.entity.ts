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

  @Column('bool', {
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

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
