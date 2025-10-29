import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AccesoriosArreglo } from '../../accesorios-arreglo/entities/accesorios-arreglo.entity';

@Entity('accesorio')
export class Accesorio {
  @PrimaryGeneratedColumn({ name: 'id_accesorio' })
  idAccesorio: number;

  @Column({ name: 'descripcion', type: 'varchar', length: 200 })
  descripcion: string;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  @Column({ name: 'categoria', type: 'varchar', length: 100 })
  categoria: string;

  // Relaciones
  @OneToMany(() => AccesoriosArreglo, accesoriosArreglo => accesoriosArreglo.accesorio)
  accesoriosArreglo: AccesoriosArreglo[];
}

