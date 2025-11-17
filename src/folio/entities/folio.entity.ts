import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EstadoActivo } from '../../common/enums';
import { Factura } from '../../factura/entities/factura.entity';
import { Pedido } from '../../pedido/entities/pedido.entity';

@Entity('folio')
export class Folio {
  @PrimaryGeneratedColumn({ name: 'id_folio' })
  idFolio: number;

  @Column({ name: 'descripcion', type: 'varchar', length: 100 })
  descripcion: string;

  @Column({
    name: 'activo',
    type: 'enum',
    enum: EstadoActivo,
    default: EstadoActivo.ACTIVO,
  })
  activo: EstadoActivo;

  @Column({ name: 'longitud', type: 'int' })
  longitud: number;

  @Column({ name: 'documento', type: 'varchar', length: 20 })
  documento: string;

  @Column({ name: 'mascara', type: 'varchar', length: 20, nullable: true })
  mascara: string;

  @Column({ name: 'valor_inicial', type: 'int' })
  valorInicial: number;

  @Column({ name: 'valor_final', type: 'int' })
  valorFinal: number;

  @Column({ name: 'ultimo_valor', type: 'int' })
  ultimoValor: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_ult', type: 'timestamp' })
  fechaUlt: Date;

  // Relaciones
  @OneToMany(() => Factura, (factura) => factura.folio)
  facturas: Factura[];

  @OneToMany(() => Pedido, (pedido) => pedido.folio)
  pedidos: Pedido[];
}

