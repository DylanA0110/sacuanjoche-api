import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('factura')
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pedido_id' })
  pedidoId: number;

  @Column({ name: 'monto_total', type: 'decimal', precision: 10, scale: 2, nullable: true })
  montoTotal: number;

  @Column({ length: 20, default: 'pendiente' })
  estado: string;

  @Column({ name: 'empleado_id', nullable: true })
  empleadoId: number;

  @Column({ name: 'num_factura', nullable: true })
  numFactura: number;

  @Column({ name: 'fecha_emision', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaEmision: Date;

  @Column({ name: 'fecha_pago', type: 'timestamp', nullable: true })
  fechaPago: Date;

  @OneToOne(() => Pedido, (pedido) => pedido.factura)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @ManyToOne(() => Empleado, (empleado) => empleado.facturas)
  empleado: Empleado;
}
