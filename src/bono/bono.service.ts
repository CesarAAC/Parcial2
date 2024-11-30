import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonoEntity } from './bono.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>
  ) {}

  async create(bono: BonoEntity): Promise<BonoEntity> {
    const { monto, usuario } = bono;
    if (usuario.rol !== 'Profesor') {
      throw new BusinessLogicException(
        `El bono debe ser asignado a un Profesor, pero se encontró el rol "${usuario.rol}".`,
        BusinessError.PRECONDITION_FAILED
      );
    }
    if (monto <= 0) {
      throw new BusinessLogicException(
        `El monto para el bono "${monto}" no es válido. Debe ser un valor positivo.`,
        BusinessError.PRECONDITION_FAILED
      );
    }
    return await this.bonoRepository.save(bono);
  }

  async delete(id: number): Promise<void> {
    const bono: BonoEntity = await this.bonoRepository.findOne({ where: { id } });
    if (!bono) {
      throw new BusinessLogicException(
        "El bono con el ID proporcionado no fue encontrado.",
        BusinessError.NOT_FOUND
      );
    }
    if (bono.calificacion > 4) {
      throw new BusinessLogicException(
        "La calificación del bono es mayor a 4, por lo que no puede ser eliminado.",
        BusinessError.PRECONDITION_FAILED
      );
    }
    await this.bonoRepository.remove(bono);
  }
}
