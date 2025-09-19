import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rol')
export class Rol {
  @PrimaryGeneratedColumn()
  idRol: number;

  @Column({ name: 'nombre', length: 50 })
  nombre: string;

  @OneToMany(() => Empleado, (empleado) => empleado.rol)
  empleados: Empleado[];
}
