import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { CarritosArreglo } from '../../carritos-arreglo/entities/carritos-arreglo.entity';
import { Pago } from '../../pago/entities/pago.entity';
import { CarritoEstado } from '../../common/enums';

@Entity('carrito')
export class Carrito {
  @PrimaryGeneratedColumn({ name: 'id_carrito' })
  idCarrito: number;

  @Column({ name: 'id_user', type: 'uuid' })
  idUser: string;

  @Column({ name: 'id_pago', nullable: true })
  idPago?: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_ult_act', type: 'timestamp' })
  fechaUltAct: Date;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 50,
    enum: CarritoEstado,
    default: CarritoEstado.ACTIVO,
  })
  estado: CarritoEstado;

  // Relaciones
  @OneToOne(() => User, user => user.carrito)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Pago, { nullable: true })
  @JoinColumn({ name: 'id_pago' })
  pago?: Pago;

  @OneToMany(() => CarritosArreglo, carritosArreglo => carritosArreglo.carrito)
  carritosArreglo: CarritosArreglo[];
}

