import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Arreglo } from '../../arreglo/entities/arreglo.entity';
import { Flor } from '../../flor/entities/flor.entity';

@Entity('arreglo_flor')
export class ArregloFlor {
  @PrimaryGeneratedColumn({ name: 'id_arreglo_flor' })
  idArregloFlor: number;

  @Column({ name: 'id_arreglo' })
  idArreglo: number;

  @Column({ name: 'id_flor' })
  idFlor: number;

  @Column({ name: 'cantidad', type: 'int'})
  cantidad: number;
  // Relaciones
  @ManyToOne(() => Arreglo, arreglo => arreglo.arreglosFlor)
  @JoinColumn({ name: 'id_arreglo' })
  arreglo: Arreglo;

  @ManyToOne(() => Flor, flor => flor.arreglosFlor)
  @JoinColumn({ name: 'id_flor' })
  flor: Flor;
}

