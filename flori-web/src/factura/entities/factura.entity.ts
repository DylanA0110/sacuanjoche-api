import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';

@Entity('factura')
export class Factura {
  @PrimaryGeneratedColumn({ name: 'id_factura' })
  idFactura: number;

  @Column({ name: 'id_pedido' })
  idPedido: number;

  @Column({ name: 'id_empleado' })
  idEmpleado: number;

  @Column({ name: 'num_factura', type: 'varchar', length: 50, unique: true })
  numFactura: string;

  @CreateDateColumn({ name: 'fecha_emision', type: 'timestamp' })
  fechaEmision: Date;

  @Column({ name: 'estado', type: 'varchar', length: 50 })
  estado: string;

  @Column({ name: 'monto_total', type: 'decimal', precision: 10, scale: 2 })
  montoTotal: number;

  // Relaciones
  @OneToOne(() => Pedido, pedido => pedido.factura)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Empleado, empleado => empleado.facturas)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;
}

