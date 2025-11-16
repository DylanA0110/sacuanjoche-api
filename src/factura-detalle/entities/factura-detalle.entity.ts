import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Factura } from '../../factura/entities/factura.entity';
import { Arreglo } from '../../arreglo/entities/arreglo.entity';

@Entity('factura_detalle')
export class FacturaDetalle {
  @PrimaryGeneratedColumn({ name: 'id_factura_detalle' })
  idFacturaDetalle: number;

  @Column({ name: 'id_factura' })
  idFactura: number;

  @Column({ name: 'id_arreglo' })
  idArreglo: number;

  @Column({ name: 'cantidad', type: 'int' })
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ name: 'subtotal', type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  // Relaciones
  @ManyToOne(() => Factura, (factura) => factura.detallesFactura)
  @JoinColumn({ name: 'id_factura' })
  factura: Factura;

  @ManyToOne(() => Arreglo, (arreglo) => arreglo.detallesFactura)
  @JoinColumn({ name: 'id_arreglo' })
  arreglo: Arreglo;

  @BeforeInsert()
  @BeforeUpdate()
  private updateSubtotal(): void {
    const cantidad = Number(this.cantidad);
    const precio = Number(this.precioUnitario);

    const subtotal =
      Number.isFinite(cantidad) && Number.isFinite(precio)
        ? cantidad * precio
        : 0;

    this.subtotal = Number(subtotal.toFixed(2));
  }
}

