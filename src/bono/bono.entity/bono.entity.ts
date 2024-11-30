import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { ClaseEntity } from 'src/clase/clase.entity';

@Entity()
export class BonoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column('float')
  calificacion: number;

  @Column()
  palabraClave: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.bonos)
  usuario: UsuarioEntity;

  @ManyToOne(() => ClaseEntity, (clase) => clase.bonos)
  clase: ClaseEntity;
}
