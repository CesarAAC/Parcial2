
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { ClaseEntity } from 'src/clase/clase.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from 'typeorm';


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

  @Column()
  rol: string;

  @Column('int')
  puntos: number;

  @OneToMany(() => BonoEntity, (bono) => bono.usuario)
  bonos: BonoEntity[];

  @OneToMany(() => ClaseEntity, (clase) => clase.usuario)
  clases: ClaseEntity[];

  @ManyToOne(() => UsuarioEntity, { nullable: true })
  jefe: UsuarioEntity;



}
