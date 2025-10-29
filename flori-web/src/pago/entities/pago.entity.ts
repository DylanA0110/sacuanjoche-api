import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { MetodoPago } from '../../metodo-pago/entities/metodo-pago.entity';

@Entity('pago')
export class Pago {
  @PrimaryGeneratedColumn({ name: 'id_pago' })
  idPago: number;

  @Column({ name: 'id_pedido' })
  idPedido: number;

  @Column({ name: 'id_metodo_pago' })
  idMetodoPago: number;

  @Column({ name: 'monto', type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ name: 'estado', type: 'varchar', length: 50 })
  estado: string;

  @CreateDateColumn({ name: 'fecha_pago', type: 'timestamp' })
  fechaPago: Date;

  @Column({ name: 'referencia', type: 'varchar', length: 200, nullable: true })
  referencia: string;

  @Column({ name: 'gateway', type: 'varchar', length: 100, nullable: true })
  gateway: string;

  @Column({ name: 'id_gateway', type: 'varchar', length: 200, nullable: true })
  idGateway: string;

  @Column({ name: 'payment_link_url', type: 'text', nullable: true })
  paymentLinkUrl: string;
  
  @Column({ name: 'payment_url_ext', type: 'text', nullable: true })
  paymentUrlExt: string;

  @Column({ name: 'raw_payload', type: 'text', nullable: true })
  rawPayload: string;

  // Relaciones
  @ManyToOne(() => Pedido, pedido => pedido.pagos)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => MetodoPago, metodoPago => metodoPago.pagos)
  @JoinColumn({ name: 'id_metodo_pago' })
  metodoPago: MetodoPago;
}

