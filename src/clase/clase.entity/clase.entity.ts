/* eslint-disable prettier/prettier */
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class ClaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('int')
  creditos: number;
  
  @Column()
  codigo: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.clases)
  @JoinColumn()
  usuario: UsuarioEntity;

  @OneToMany(() => BonoEntity, (bono) => bono.clase)
  bonos: BonoEntity[];

}
