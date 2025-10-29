import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Arreglo } from '../../arreglo/entities/arreglo.entity';

@Entity('forma_arreglo')
export class FormaArreglo {
  @PrimaryGeneratedColumn({ name: 'id_forma_arreglo' })
  idFormaArreglo: number;

  @Column({ name: 'descripcion', type: 'varchar', length: 200 })
  descripcion: string;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  // Relaciones
  @OneToMany(() => Arreglo, arreglo => arreglo.formaArreglo)
  arreglos: Arreglo[];
}

