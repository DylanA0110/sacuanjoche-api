import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Envio } from '../../envio/entities/envio.entity';
import { Factura } from '../../factura/entities/factura.entity';
import { User } from '../../auth/entities/user.entity';
import { PedidoHistorial } from '../../pedido-historial/entities/pedido-historial.entity';
import { Ruta } from '../../ruta/entities/ruta.entity';
import { EmpleadoEstado } from '../../common/enums';

@Entity('empleado')
export class Empleado {
  @PrimaryGeneratedColumn({ name: 'id_empleado' })
  idEmpleado: number;

  @Column({ name: 'primer_nombre', type: 'varchar', length: 100 })
  primerNombre: string;

  @Column({ name: 'segundo_nombre', type: 'varchar', length: 100 })
  segundoNombre: string;

  @Column({ name: 'primer_apellido', type: 'varchar', length: 100 })
  primerApellido: string;

  @Column({
    name: 'segundo_apellido',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  segundoApellido: string;

  @Column({ name: 'sexo', type: 'varchar', length: 10 })
  sexo: string;

  @Column({ name: 'telefono', type: 'varchar', length: 20 })
  telefono: string;

  @Column({ name: 'fecha_nac', type: 'date' })
  fechaNac: Date;

  @Column({
    name: 'estado',
    type: 'varchar',
    length: 50,
    enum: EmpleadoEstado,
    default: EmpleadoEstado.ACTIVO,
  })
  estado: EmpleadoEstado;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

  // Relaciones
  @OneToMany(() => Pedido, (pedido) => pedido.empleado)
  pedidos: Pedido[];

  @OneToMany(() => Envio, (envio) => envio.empleado)
  envios: Envio[];

  @OneToMany(() => Factura, (factura) => factura.empleado)
  facturas: Factura[];

  @OneToOne(() => User, (user) => user.empleado)
  user: User;

  @OneToMany(
    () => PedidoHistorial,
    (pedidoHistorial) => pedidoHistorial.empleado,
  )
  pedidosHistorial: PedidoHistorial[];

  @OneToMany(() => Ruta, (ruta) => ruta.empleado)
  rutas: Ruta[];
}
