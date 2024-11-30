/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateClaseDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsInt()
  creditos: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'El código debe tener exactamente 10 caracteres.' })
  @MaxLength(10, { message: 'El código debe tener exactamente 10 caracteres.' })
  codigo: string;

  @IsNotEmpty()
  usuarioId: number;
}
