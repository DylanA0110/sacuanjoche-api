import { DetallePedido } from 'src/detalle-pedido/entities/detalle-pedido.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_producto', length: 100 })
  nombreProducto: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'url_imagen', type: 'text', nullable: true })
  urlImagen: string;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.producto)
  detallePedidos: DetallePedido[];
}
