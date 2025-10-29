import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ArregloFlor } from '../../arreglo-flor/entities/arreglo-flor.entity';

@Entity('flor')
export class Flor {
  @PrimaryGeneratedColumn({ name: 'id_flor' })
  idFlor: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'color', type: 'varchar', length: 50 })
  color: string;

  @Column({name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2})
  precioUnitario: number;

  @Column({ name: 'tipo', type: 'varchar', length: 50 })
  tipo: string;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  // Relaciones
  @OneToMany(() => ArregloFlor, arregloFlor => arregloFlor.flor)
  arreglosFlor: ArregloFlor[];
}

