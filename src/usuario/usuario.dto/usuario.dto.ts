/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsInt, IsEnum} from 'class-validator';
import { Rol } from 'src/usuario/usuario.entity/usuario.entity';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsInt()
  cedula: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  grupoInvestigacion: string;

  @IsNotEmpty()
  @IsInt()
  extencion: number;

  @IsNotEmpty()
  @IsEnum(Rol)
  rol: Rol;

  @IsNotEmpty()
  @IsInt()
  puntos: number;
  
  @IsNotEmpty()
  jefeId?: number;
}
