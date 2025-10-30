import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pago } from '../../pago/entities/pago.entity';

@Entity('metodo_pago')
export class MetodoPago {
  @PrimaryGeneratedColumn({ name: 'id_metodo_pago' })
  idMetodoPago: number;

  @Column({ name: 'descripcion', type: 'varchar', length: 200 })
  descripcion: string;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  // Relaciones
  @OneToMany(() => Pago, pago => pago.metodoPago)
  pagos: Pago[];
}

