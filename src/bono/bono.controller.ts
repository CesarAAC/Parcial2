/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';
import { BusinessLogicException } from 'src/shared/errors/business-errors';

@Controller('bonos')
export class BonoController {
  constructor(private readonly bonoService: BonoService) {}

  @Post()
  async create(@Body() bono: BonoEntity): Promise<BonoEntity> {
    try {
      return await this.bonoService.crearBono(bono);
    } catch (error) {
      throw new BusinessLogicException(error.message, error.code);
    }
  }

  @Get('codigo/:codigo')
  async findByCodigo(@Param('codigo') codigo: string): Promise<BonoEntity[]> {
    try {
      return await this.bonoService.findBonosByCodigo(codigo);
    } catch (error) {
      throw new BusinessLogicException(error.message, error.code);
    }
  }

  @Get('usuario/:idUsuario')
  async findByUsuario(@Param('idUsuario') idUsuario: number): Promise<BonoEntity[]> {
    try {
      return await this.bonoService.findBonosByUsario(idUsuario);
    } catch (error) {
      throw new BusinessLogicException(error.message, error.code);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.bonoService.delete(id);
    } catch (error) {
      throw new BusinessLogicException(error.message, error.code);
    }
  }
}
