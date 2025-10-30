import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Arreglo } from '../../arreglo/entities/arreglo.entity';

@Entity('detalle_pedido')
export class DetallePedido {
  @PrimaryGeneratedColumn({ name: 'id_detalle_pedido' })
  idDetallePedido: number;

  @Column({ name: 'id_pedido' })
  idPedido: number;

  @Column({ name: 'id_arreglo' })
  idArreglo: number;

  @Column({ name: 'cantidad', type: 'int' })
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ name: 'subtotal', type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  // Relaciones
  @ManyToOne(() => Pedido, pedido => pedido.detallesPedido)
  @JoinColumn({ name: 'id_pedido' })
  pedido: Pedido;

  @ManyToOne(() => Arreglo, arreglo => arreglo.detallesPedido)
  @JoinColumn({ name: 'id_arreglo' })
  arreglo: Arreglo;
}

