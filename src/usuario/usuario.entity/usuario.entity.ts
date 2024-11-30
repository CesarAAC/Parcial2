/* eslint-disable prettier/prettier */
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

export enum Rol {
  PROFESOR = 'Profesor',
  DECANA = 'Decana',
}

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  grupoInvestigacion: string;

  @Column('int')
  extencion: number;

  @Column({ type: 'enum', enum: Rol })
  rol: Rol;

  @Column('int')
  puntos: number;

  @OneToMany(() => BonoEntity, (bono) => bono.usuario)
  bonos: BonoEntity[];

  @OneToMany(() => ClaseEntity, (clase) => clase.usuario)
  clases: ClaseEntity[];

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  jefe: UsuarioEntity;

}
