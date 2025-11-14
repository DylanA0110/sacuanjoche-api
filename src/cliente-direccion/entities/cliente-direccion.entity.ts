import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Direccion } from '../../direccion/entities/direccion.entity';

@Entity('cliente_direccion')
export class ClienteDireccion {
  @PrimaryGeneratedColumn({ name: 'id_cliente_direccion' })
  idClienteDireccion: number;

  @Column({ name: 'id_cliente' })
  idCliente: number;

  @Column({ name: 'id_direccion' })
  idDireccion: number;

  @Column({ name: 'etiqueta', type: 'varchar', length: 100 })
  etiqueta: string;

  @Column({ name: 'es_predeterminada', type: 'boolean', default: false })
  esPredeterminada: boolean;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_ult_act', type: 'timestamp' })
  fechaUltAct: Date;

  // Relaciones
  @ManyToOne(() => Cliente, (cliente) => cliente.direcciones)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @ManyToOne(() => Direccion, (direccion) => direccion.clienteDirecciones)
  @JoinColumn({ name: 'id_direccion' })
  direccion: Direccion;
}
