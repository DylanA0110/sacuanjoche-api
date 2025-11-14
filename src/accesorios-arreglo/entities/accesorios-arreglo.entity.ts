import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Accesorio } from '../../accesorio/entities/accesorio.entity';
import { Arreglo } from '../../arreglo/entities/arreglo.entity';

@Entity('accesorios_arreglo')
export class AccesoriosArreglo {
  @PrimaryGeneratedColumn({ name: 'id_accesorio_arreglo' })
  idAccesorioArreglo: number;

  @Column({ name: 'id_accesorio' })
  idAccesorio: number;

  @Column({ name: 'id_arreglo' })
  idArreglo: number;

  @Column({ name: 'cantidad', type: 'int', nullable: true, default: 0 })
  cantidad: number;

  // Relaciones
  @ManyToOne(() => Accesorio, (accesorio) => accesorio.accesoriosArreglo)
  @JoinColumn({ name: 'id_accesorio' })
  accesorio: Accesorio;

  @ManyToOne(() => Arreglo, (arreglo) => arreglo.accesoriosArreglo)
  @JoinColumn({ name: 'id_arreglo' })
  arreglo: Arreglo;
}
