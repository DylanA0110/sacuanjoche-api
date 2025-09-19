import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { DetallePedido } from 'src/detalle-pedido/entities/detalle-pedido.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'fecha_solicitud', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaSolicitud: Date;

  @Column({ name: 'fecha_entrega', type: 'timestamp', nullable: true })
  fechaEntrega: Date;

  @Column({ length: 20, default: 'pendiente' })
  estado: string;

  @Column({ name: 'metodo_pago', length: 20, nullable: true })
  metodoPago: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number;

  @Column({ name: 'direccion_entrega', length: 200, nullable: true })
  direccionEntrega: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitud: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitud: number;

  @Column({ name: 'nombre_destinatario', length: 50, nullable: true })
  nombreDestinatario: string;

  @Column({ name: 'apellido_destinatario', length: 50, nullable: true })
  apellidoDestinatario: string;

  @Column({ name: 'telefono_destinatario', length: 20, nullable: true })
  telefonoDestinatario: string;

  @Column({ name: 'repartidor_id', nullable: true })
  repartidorId: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente: Cliente;

  @ManyToOne(() => Empleado, (empleado) => empleado.pedidosRepartidor)
  repartidor: Empleado;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido)
  detallePedidos: DetallePedido[];

  @OneToOne(() => Factura, (factura) => factura.pedido)
  factura: Factura;
}
