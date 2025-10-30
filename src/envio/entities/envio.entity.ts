import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';

@Entity('envio')
export class Envio {
  @PrimaryGeneratedColumn({ name: 'id_envio' })
  idEnvio: number;

  @Column({ name: 'id_pedido' })
  idPedido: number;

  @Column({ name: 'id_empleado' })
  idEmpleado: number;

  @Column({ name: 'estado_envio', type: 'varchar', length: 50 })
  estadoEnvio: string;

  @Column({ name: 'fecha_programada', type: 'timestamp' })
  fechaProgramada: Date;

  @Column({ name: 'fecha_salida', type: 'timestamp', nullable: true })
  fechaSalida: Date;

  @Column({ name: 'fecha_entrega', type: 'timestamp', nullable: true })
  fechaEntrega: Date;

  @Column({ name: 'origen_lat', type: 'decimal', precision: 10, scale: 8 })
  origenLat: number;

  @Column({ name: 'origen_lng', type: 'decimal', precision: 11, scale: 8 })
  origenLng: number;

  @Column({ name: 'destino_lat', type: 'decimal', precision: 10, scale: 8 })
  destinoLat: number;

  @Column({ name: 'destino_lng', type: 'decimal', precision: 11, scale: 8 })
  destinoLng: number;

  @Column({ name: 'costo_envio', type: 'decimal', precision: 10, scale: 2 })
  costoEnvio: number;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones: string;

  // Relaciones
  @OneToOne(() => Pedido, pedido => pedido.envio)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Empleado, empleado => empleado.envios)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;
}

