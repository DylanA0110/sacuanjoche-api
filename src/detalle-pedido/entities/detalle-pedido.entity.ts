import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('detalle_pedido')
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pedido_id' })
  pedidoId: number;

  @Column({ name: 'producto_id' })
  productoId: number;

  @Column()
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detallePedidos)
  pedido: Pedido;

  @ManyToOne(() => Producto, (producto) => producto.detallePedidos)
  producto: Producto;
}
