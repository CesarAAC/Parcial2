import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

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
  usuario: UsuarioEntity;

  @OneToMany(() => BonoEntity, (bono) => bono.clase)
  bonos: BonoEntity[];

}
