import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { CarritosArreglo } from '../../carritos-arreglo/entities/carritos-arreglo.entity';

@Entity('carrito')
export class Carrito {
  @PrimaryGeneratedColumn({ name: 'id_carrito' })
  idCarrito: number;

  @Column({ name: 'id_user' })
  idUser: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_ult_act', type: 'timestamp' })
  fechaUltAct: Date;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  // Relaciones
  @OneToOne(() => User, user => user.carrito)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => CarritosArreglo, carritosArreglo => carritosArreglo.carrito)
  carritosArreglo: CarritosArreglo[];
}

