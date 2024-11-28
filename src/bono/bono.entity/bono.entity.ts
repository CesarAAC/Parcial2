import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Double, Long} from 'typeorm/driver/mongodb/bson.typings';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { ClaseEntity } from 'src/clase/clase.entity';
{}

@Entity()
export class BonoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: Long;

 @Column()
 monto: number;
 
 @Column()
 calificacion: Double;
 
 @Column()
 palabraClave: string;

 @ManyToOne(() => UsuarioEntity, (usuario) => usuario.bonos)
 usuario: UsuarioEntity;

 @ManyToOne(() => ClaseEntity, (clase) => clase.bonos)
 clase: ClaseEntity;
 
}