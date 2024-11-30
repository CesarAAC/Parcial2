/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity/clase.entity';
import { BusinessLogicException } from 'src/shared/errors/business-errors';

@Controller('clases')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  @Post()
  async create(@Body() clase: ClaseEntity): Promise<ClaseEntity> {
    try {
      return await this.claseService.crearClase(clase);
    } catch (error) {
      throw new BusinessLogicException(error.message, error.code);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ClaseEntity> {
    try {
      return await this.claseService.findClaseById(id);
    } catch (error) {
      throw new BusinessLogicException(error.message, error.code);
    }
  }
}
