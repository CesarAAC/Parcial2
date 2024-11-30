/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateBonoDto {
  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @IsNotEmpty()
  @Min(0)
  calificacion: number;

  @IsNotEmpty()
  @IsString()
  palabraClave: string;

  @IsNotEmpty()
  usuarioId: number;

  @IsNotEmpty()
  claseId: number;
}
