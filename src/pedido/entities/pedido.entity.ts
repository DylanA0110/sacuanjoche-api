import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Direccion } from '../../direccion/entities/direccion.entity';
import { ContactoEntrega } from '../../contacto-entrega/entities/contacto-entrega.entity';
import { DetallePedido } from '../../detalle-pedido/entities/detalle-pedido.entity';
import { Pago } from '../../pago/entities/pago.entity';
import { Envio } from '../../envio/entities/envio.entity';
import { Factura } from '../../factura/entities/factura.entity';
import { PedidoHistorial } from '../../pedido-historial/entities/pedido-historial.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn({ name: 'id_pedido' })
  idPedido: number;

  @Column({ name: 'id_empleado' })
  idEmpleado: number;

  @Column({ name: 'id_cliente' })
  idCliente: number;

  @Column({ name: 'id_direccion' })
  idDireccion: number;

  @Column({ name: 'id_contacto_entrega' })
  idContactoEntrega: number;

  @Column({ name: 'total_productos', type: 'decimal', precision: 10, scale: 2 })
  totalProductos: number;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion', type: 'timestamp' })
  fechaActualizacion: Date;

  @Column({ name: 'fecha_entrega_estimada', type: 'timestamp' })
  fechaEntregaEstimada: Date;

  @Column({ name: 'direccion_txt', type: 'text' })
  direccionTxt: string;

  @Column({ name: 'costo_envio', type: 'decimal', precision: 10, scale: 2 })
  costoEnvio: number;

  @Column({ name: 'total_pedido', type: 'decimal', precision: 10, scale: 2 })
  totalPedido: number;

  // Relaciones
  @ManyToOne(() => Empleado, empleado => empleado.pedidos)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;

  @ManyToOne(() => Cliente, cliente => cliente.pedidos)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @ManyToOne(() => Direccion, direccion => direccion.pedidos)
  @JoinColumn({ name: 'id_direccion' })
  direccion: Direccion;

  @ManyToOne(() => ContactoEntrega, contactoEntrega => contactoEntrega.pedidos)
  @JoinColumn({ name: 'id_contacto_entrega' })
  contactoEntrega: ContactoEntrega;

  @OneToMany(() => DetallePedido, detallePedido => detallePedido.pedido)
  detallesPedido: DetallePedido[];

  @OneToMany(() => Pago, pago => pago.pedido)
  pagos: Pago[];

  @OneToOne(() => Envio, envio => envio.pedido)
  envio: Envio;

  @OneToOne(() => Factura, factura => factura.pedido)
  factura: Factura;

  @OneToMany(() => PedidoHistorial, pedidoHistorial => pedidoHistorial.pedido)
  historial: PedidoHistorial[];
}

