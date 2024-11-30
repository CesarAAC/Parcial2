/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { BusinessLogicException } from 'src/shared/errors/business-errors';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() usuario: UsuarioEntity): Promise<UsuarioEntity> {
    try {
      return await this.usuarioService.create(usuario);
    } catch (error) {
      throw new BusinessLogicException(error.message, error.code);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<UsuarioEntity> {
    try {
      return await this.usuarioService.findUsuarioById(id);
    } catch (error) {
      throw new BusinessLogicException(error.message, error.code);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.usuarioService.delete(id);
    } catch (error) {
      throw new BusinessLogicException(error.message, error.code);
    }
  }
}
