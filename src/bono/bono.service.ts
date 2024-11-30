/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonoEntity } from './bono.entity/bono.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class BonoService {
  constructor(
    @InjectRepository(BonoEntity)
    private readonly bonoRepository: Repository<BonoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ClaseEntity)
    private readonly claseRepository: Repository<ClaseEntity>
  ) {}

  async crearBono(bono: BonoEntity): Promise<BonoEntity> {
    const { monto, usuario, clase } = bono;

    if (monto == null || monto <= 0) {
      throw new BusinessLogicException(
        `El monto para el bono "${monto}" no es válido. Debe ser un valor positivo.`,
        BusinessError.PRECONDITION_FAILED
      );
    }

    const usuarioExistente = await this.usuarioRepository.findOne({ where: { id: usuario.id } });
    if (!usuarioExistente) {
      throw new BusinessLogicException(
        `El usuario con ID "${usuario.id}" no existe.`,
        BusinessError.NOT_FOUND
      );
    }

    if (usuarioExistente.rol !== 'Profesor') {
      throw new BusinessLogicException(
        `El usuario con el rol "${usuarioExistente.rol}" no puede recibir un bono. Solo los Profesores pueden recibir bonos.`,
        BusinessError.PRECONDITION_FAILED
      );
    }

    const claseExistente = await this.claseRepository.findOne({ where: { id: clase.id } });
    if (!claseExistente) {
      throw new BusinessLogicException(
        `La clase con ID "${clase.id}" no existe.`,
        BusinessError.NOT_FOUND
      );
    }

    return await this.bonoRepository.save(bono);
  }

  async findBonosByCodigo(codigo: string): Promise<BonoEntity[]> {
    const clase = await this.claseRepository.findOne({ where: { codigo } });
    if (!clase) {
      throw new BusinessLogicException(
        `No se encontró una clase con el código "${codigo}".`,
        BusinessError.NOT_FOUND
      );
    }

    const bonos= await this.bonoRepository.find({where:{clase}});

    if (bonos.length===0) {
      throw new BusinessLogicException(
        `No se encontró ningun bono asociado a la clase de codigo: "${codigo}".`,
        BusinessError.NOT_FOUND
      );
    }

    return bonos;
  }
  async findBonosByUsario(idUsuario: number): Promise<BonoEntity[]> {
    const usuario = await this.usuarioRepository.findOne({ where: { id:idUsuario } });
    if (!usuario) {
      throw new BusinessLogicException(
        `No se encontró un usuario con el ID "${idUsuario}".`,
        BusinessError.NOT_FOUND
      );
    }
    
    const bonos= await this.bonoRepository.find({where:{usuario}});

    if (bonos.length===0) {
      throw new BusinessLogicException(
        `No se encontró ningun bono asociado al usuario con ID: "${idUsuario}".`,
        BusinessError.NOT_FOUND
      );
    }

    return bonos;
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
