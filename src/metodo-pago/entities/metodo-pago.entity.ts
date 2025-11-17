import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pago } from '../../pago/entities/pago.entity';
import { MetodoPagoTipo, PedidoCanal, MetodoPagoEstado } from '../../common/enums';

@Entity('metodo_pago')
export class MetodoPago {
  @PrimaryGeneratedColumn({ name: 'id_metodo_pago' })
  idMetodoPago: number;

  @Column({ name: 'descripcion', type: 'varchar', length: 200 })
  descripcion: string;

  @Column({
    name: 'tipo',
    type: 'varchar',
    length: 50,
    enum: MetodoPagoTipo,
    default: MetodoPagoTipo.MIXTO,
  })
  tipo: MetodoPagoTipo;

  @Column({
    name: 'canales_disponibles',
    type: 'varchar',
    array: true,
    default: [PedidoCanal.WEB, PedidoCanal.INTERNO],
  })
  canalesDisponibles: PedidoCanal[];

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 50,
    enum: MetodoPagoEstado,
    default: MetodoPagoEstado.ACTIVO,
  })
  estado: MetodoPagoEstado;

  // Relaciones
  @OneToMany(() => Pago, pago => pago.metodoPago)
  pagos: Pago[];
}

