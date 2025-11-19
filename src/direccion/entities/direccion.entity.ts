import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { ClienteDireccion } from '../../cliente-direccion/entities/cliente-direccion.entity';
import { Pedido } from '../../pedido/entities/pedido.entity';

@Entity('direccion')
export class Direccion {
  @PrimaryGeneratedColumn({ name: 'id_direccion' })
  idDireccion: number;

  @Column({ name: 'formatted_address', type: 'text' })
  formattedAddress: string;

  @Column({ name: 'country', type: 'varchar', length: 100 })
  country: string;

  @Column({ name: 'admin_area', type: 'varchar', length: 100, nullable: true })
  adminArea: string;

  @Column({ name: 'city', type: 'varchar', length: 100 })
  city: string;

  @Column({
    name: 'neighborhood',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  neighborhood: string;

  @Column({ name: 'street', type: 'varchar', length: 200, nullable: true })
  street: string;

  @Column({ name: 'house_number', type: 'varchar', length: 20, nullable: true })
  houseNumber: string;

  @Column({ name: 'postal_code', type: 'varchar', length: 20, nullable: true })
  postalCode: string;

  @Column({ name: 'referencia', type: 'text', nullable: true })
  referencia: string;

  @Column({ name: 'lat', type: 'decimal', precision: 10, scale: 8 })
  lat: number;

  @Column({ name: 'lng', type: 'decimal', precision: 11, scale: 8 })
  lng: number;

  @Column({ name: 'provider', type: 'varchar', length: 50, nullable: true })
  provider: string;

  @Column({ name: 'place_id', type: 'varchar', length: 200, nullable: true })
  placeId: string;

  @Column({ name: 'accuracy', type: 'varchar', length: 50, nullable: true })
  accuracy: string;

  @Column({ name: 'geolocation', type: 'text', nullable: true })
  geolocation: string;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_ult_act', type: 'timestamp' })
  fechaUltAct: Date;

  // Relaciones
  @OneToMany(
    () => ClienteDireccion,
    (clienteDireccion) => clienteDireccion.direccion,
  )
  clienteDirecciones: ClienteDireccion[];

  @OneToMany(() => Pedido, (pedido) => pedido.direccion)
  pedidos: Pedido[];
}
