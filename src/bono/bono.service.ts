import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { BonoEntity } from './bono.entity/bono.entity';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>
  ) { }

  async create(bono: BonoEntity): Promise<BonoEntity> {
    const { monto, usuario} = bono;

    if (usuario.rol == 'Profesor') {
        throw new BusinessLogicException(
          `El bono no puede ser para un/a "${usuario.rol}" tiene que ser para un Profesor.`,
        );
    }
    if (monto<=0 || monto==null) {
        throw new BusinessLogicException(
          `El monto para el bono:"${monto}" no es válido. Debe ser un positivo`,
        );
    }
    return await this.bonoRepository.save(bono);
  }


  async delete(id: number) {
    const bono: BonoEntity = await this.bonoRepository.findOne({ where: { id } });
    if (!bono)
      throw new BusinessLogicException("The bono with the given id was not found", BusinessError.NOT_FOUND);
    if(bono.calificacion>4){
        throw new BusinessLogicException(
            `La calificacion del bono es muy alta como para eliminarla`,
          );
    }

    await this.bonoRepository.remove(bono);
  }

}