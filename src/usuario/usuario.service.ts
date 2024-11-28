import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) { }

  async findUsuarioById(id: number): Promise<UsuarioEntity> {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id }, relations: ["bonos", "clases", "jefe"] });
    if (!usuario)
      throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);

    return usuario;
  }

  async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    const { rol, grupoInvestigacion, extencion } = usuario;

    if (rol === 'Profesor') {
      const gruposPermitidos = ['TICSW', 'IMAGINE', 'COMIT'];
      if (!gruposPermitidos.includes(grupoInvestigacion)) {
        throw new BusinessLogicException(
          `El grupo de investigación "${grupoInvestigacion}" no es válido para el rol Profesor.`,
        );
      }
    }
    if (rol === 'Decana') {
      if (!(9999999 < extencion && extencion < 100000000)) {
        throw new BusinessLogicException(
          `El número de extensión "${extencion}" no es válido para el rol Decana. Debe ser un número de 8 dígitos.`,
        );
      }
    }
    return await this.usuarioRepository.save(usuario);
  }


  async delete(id: number) {
    const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario)
      throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND);

    await this.usuarioRepository.remove(usuario);
  }

}