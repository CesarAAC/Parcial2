/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {BusinessError, BusinessLogicException,} from 'src/shared/errors/business-errors';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async findUsuarioById(id: number): Promise<UsuarioEntity> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['bonos', 'clases', 'jefe'],
    });
    if (!usuario)
      throw new BusinessLogicException(
        'El usuario con el ID proporcionado no fue encontrado.',
        BusinessError.NOT_FOUND,
      );

    return usuario;
  }

  async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    const { rol, grupoInvestigacion, extencion } = usuario;

    if (rol === 'Profesor') {
      const gruposPermitidos = ['TICSW', 'IMAGINE', 'COMIT'];
      if (!gruposPermitidos.includes(grupoInvestigacion)) {
        throw new BusinessLogicException(
          `El grupo de investigación "${grupoInvestigacion}" no es válido para el rol Profesor.`,
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }
    if (rol === 'Decana') {
      if (extencion.toString().length !== 8) {
        throw new BusinessLogicException(
          `El número de extensión "${extencion}" no es válido para el rol Decana. Debe ser un número de 8 dígitos.`,
          BusinessError.PRECONDITION_FAILED,
        );
      }
    }
    return await this.usuarioRepository.save(usuario);
  }

  async delete(id: number) {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuario)
      throw new BusinessLogicException(
        'El usuario con el ID proporcionado no fue encontrado.',
        BusinessError.NOT_FOUND,
      );
    const { rol, bonos } = usuario;
    if (rol === 'Decana')
      throw new BusinessLogicException(
        'No se pueden eliminar Decanos',
        BusinessError.PRECONDITION_FAILED,
      );
    if (bonos.length > 0)
      throw new BusinessLogicException(
        'No se pueden eliminar usuarios con bonos asociados',
        BusinessError.PRECONDITION_FAILED,
      );

    await this.usuarioRepository.remove(usuario);
  }
}
