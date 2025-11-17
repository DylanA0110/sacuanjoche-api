import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { FormaArreglo } from '../../forma-arreglo/entities/forma-arreglo.entity';
import { ArregloFlor } from '../../arreglo-flor/entities/arreglo-flor.entity';
import { AccesoriosArreglo } from '../../accesorios-arreglo/entities/accesorios-arreglo.entity';
import { CarritosArreglo } from '../../carritos-arreglo/entities/carritos-arreglo.entity';
import { DetallePedido } from '../../detalle-pedido/entities/detalle-pedido.entity';
import { FacturaDetalle } from '../../factura-detalle/entities/factura-detalle.entity';
import { ArregloMedia } from './arreglo-media.entity';
import { ArregloEstado } from '../../common/enums/arreglo-estado.enum';

@Entity('arreglo')
export class Arreglo {
  @PrimaryGeneratedColumn({ name: 'id_arreglo' })
  idArreglo: number;

  @Column({ name: 'id_forma_arreglo' })
  idFormaArreglo: number;

  @Column({ name: 'nombre', type: 'varchar', length: 200 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'url', type: 'text', nullable: true })
  url: string | null;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 50,
    enum: ArregloEstado,
    default: ArregloEstado.ACTIVO,
  })
  estado: ArregloEstado;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  // Relaciones
  @ManyToOne(() => FormaArreglo, (formaArreglo) => formaArreglo.arreglos)
  @JoinColumn({ name: 'id_forma_arreglo' })
  formaArreglo: FormaArreglo;

  @OneToMany(() => ArregloFlor, (arregloFlor) => arregloFlor.arreglo)
  arreglosFlor: ArregloFlor[];

  @OneToMany(
    () => AccesoriosArreglo,
    (accesoriosArreglo) => accesoriosArreglo.arreglo,
  )
  accesoriosArreglo: AccesoriosArreglo[];

  @OneToMany(
    () => CarritosArreglo,
    (carritosArreglo) => carritosArreglo.arreglo,
  )
  carritosArreglo: CarritosArreglo[];

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.arreglo)
  detallesPedido: DetallePedido[];

  @OneToMany(() => FacturaDetalle, (facturaDetalle) => facturaDetalle.arreglo)
  detallesFactura: FacturaDetalle[];

  @OneToMany(() => ArregloMedia, (media) => media.arreglo)
  media: ArregloMedia[];
}
