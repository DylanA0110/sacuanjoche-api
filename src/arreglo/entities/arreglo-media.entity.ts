import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Arreglo } from './arreglo.entity';

@Entity('arreglo_media')
export class ArregloMedia {
  @PrimaryGeneratedColumn({ name: 'id_arreglo_media' })
  idArregloMedia: number;

  @Column({ name: 'id_arreglo' })
  idArreglo: number;

  @ManyToOne(() => Arreglo, (arreglo) => arreglo.media, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_arreglo' })
  arreglo: Arreglo;

  @Column({ name: 'url', type: 'text' })
  url: string;

  @Column({ name: 'provider', type: 'varchar', length: 50, default: 'spaces' })
  provider: string;

  @Column({ name: 'object_key', type: 'varchar', length: 255 })
  objectKey: string;

  @Column({
    name: 'content_type',
    type: 'varchar',
    length: 120,
    nullable: true,
  })
  contentType?: string;

  @Column({ name: 'orden', type: 'int', default: 0 })
  orden: number;

  @Column({ name: 'is_primary', type: 'boolean', default: false })
  isPrimary: boolean;

  @Column({ name: 'alt_text', type: 'varchar', length: 255, nullable: true })
  altText?: string;

  @Column({ name: 'metadata', type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_ult_act', type: 'timestamp' })
  fechaUltAct: Date;
}
