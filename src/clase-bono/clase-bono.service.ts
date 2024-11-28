import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { ClaseEntity } from 'src/clase/clase.entity';

@Injectable()
export class BonusClaseService {
   constructor(
       @InjectRepository(BonoEntity)
       private readonly bonoRepository: Repository<BonoEntity>,
   
       @InjectRepository(ClaseEntity)
       private readonly claseRepository: Repository<ClaseEntity>
   ) {}

   async addClasebono(bonoId: string, claseId: string): Promise<BonoEntity> {
       const clase: ClaseEntity = await this.claseRepository.findOne({where: {id: claseId}});
       if (!clase)
         throw new BusinessLogicException("The clase with the given id was not found", BusinessError.NOT_FOUND);
     
       const bono: BonoEntity = await this.bonoRepository.findOne({where: {id: bonoId}, relations: ["clases", "exhibitions"]})
       if (!bono)
         throw new BusinessLogicException("The bono with the given id was not found", BusinessError.NOT_FOUND);
   
       bono.clases = [...bono.clases, clase];
       return await this.bonoRepository.save(bono);
     }
   
   async findClaseBybonoIdClaseId(bonoId: string, claseId: string): Promise<ClaseEntity> {
       const clase: ClaseEntity = await this.claseRepository.findOne({where: {id: claseId}});
       if (!clase)
         throw new BusinessLogicException("The clase with the given id was not found", BusinessError.NOT_FOUND)
      
       const bono: BonoEntity = await this.bonoRepository.findOne({where: {id: bonoId}, relations: ["clases"]});
       if (!bono)
         throw new BusinessLogicException("The bono with the given id was not found", BusinessError.NOT_FOUND)
  
       const bonoClase: ClaseEntity = bono.clases.find(e => e.id === clase.id);
  
       if (!bonoClase)
         throw new BusinessLogicException("The clase with the given id is not associated to the bono", BusinessError.PRECONDITION_FAILED)
  
       return bonoClase;
   }
   
   async findBonosByCodigo(codigoBuscar: string): Promise<BonoEntity[]> {
    const claseBuscar: ClaseEntity = await this.claseRepository.findOne({where: { codigo: codigoBuscar },relations: ["usuario", "bonos"],
    });
    if (!claseBuscar) {
      throw new BusinessLogicException(
        "The class with the given code was not found",
        BusinessError.NOT_FOUND,
      );
    }
  
    const bonos: BonoEntity[] = await this.bonoRepository.find({
      where: { clase: claseBuscar },
      relations: ["usuario", "clase"],
    });
    return bonos;
  }

}