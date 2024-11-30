/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity/clase.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(ClaseEntity)
    private readonly claseRepository: Repository<ClaseEntity>,
  ) {}
  async crearClase(clase: ClaseEntity): Promise<ClaseEntity> {
    if (clase.codigo.length !== 10) {
      throw new BusinessLogicException(
        'El código debe tener exactamente 10 caracteres.',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.claseRepository.save(clase);
  }
  async findClaseById(id: number): Promise<ClaseEntity> {
    const clase = await this.claseRepository.findOne({
      where: { id },
    });

    if (!clase) {
      throw new BusinessLogicException(
        `La clase con el ID ${id} no fue encontrada.`,
        BusinessError.NOT_FOUND,
      );
    }

    return clase;
  }
}