import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Carrito } from '../../carrito/entities/carrito.entity';
import { Arreglo } from '../../arreglo/entities/arreglo.entity';

@Entity('carritos_arreglo')
export class CarritosArreglo {
  @PrimaryGeneratedColumn({ name: 'id_carrito_arreglo' })
  idCarritoArreglo: number;

  @Column({ name: 'id_arreglo' })
  idArreglo: number;

  @Column({ name: 'id_carrito' })
  idCarrito: number;

  @Column({ name: 'cantidad', type: 'int' })
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ name: 'total_linea', type: 'decimal', precision: 10, scale: 2 })
  totalLinea: number;

  // Relaciones
  @ManyToOne(() => Carrito, carrito => carrito.carritosArreglo)
  @JoinColumn({ name: 'id_carrito' })
  carrito: Carrito;

  @ManyToOne(() => Arreglo, arreglo => arreglo.carritosArreglo)
  @JoinColumn({ name: 'id_arreglo' })
  arreglo: Arreglo;

  @BeforeInsert()
  @BeforeUpdate()
  private updateTotalLinea(): void {
    const cantidad = Number(this.cantidad);
    const precio = Number(this.precioUnitario);

    const totalLinea =
      Number.isFinite(cantidad) && Number.isFinite(precio)
        ? cantidad * precio
        : 0;

    this.totalLinea = Number(totalLinea.toFixed(2));
  }
}

