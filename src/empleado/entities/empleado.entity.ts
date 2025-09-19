import { Rol } from 'src/rol/entities/rol.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Factura } from 'src/factura/entities/factura.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('empleado')
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'primer_nombre', length: 50 })
  primerNombre: string;

  @Column({ name: 'segundo_nombre', length: 50, nullable: true })
  segundoNombre: string;

  @Column({ name: 'primer_apellido', length: 50 })
  primerApellido: string;

  @Column({ name: 'segundo_apellido', length: 50, nullable: true })
  segundoApellido: string;

  @Column({ type: 'char', length: 1, nullable: true })
  sexo: string;

  @Column({ length: 100, nullable: true })
  correo: string;

  @Column({ length: 50, nullable: true })
  username: string;

  @Column({ name: 'contrasena', length: 255, nullable: true })
  contrasena: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ name: 'fecha_de_nac', type: 'date', nullable: true })
  fechaDeNac: Date;

  @Column({ name: 'es_aprobado', type: 'boolean', default: false })
  esAprobado: boolean;

  @Column({ name: 'rol_id' })
  rolId: number;

  @ManyToOne(() => Rol, (rol) => rol.empleados)
  rol: Rol;

  @OneToMany(() => Pedido, (pedido) => pedido.repartidor)
  pedidosRepartidor: Pedido[];

  @OneToMany(() => Factura, (factura) => factura.empleado)
  facturas: Factura[];
}
