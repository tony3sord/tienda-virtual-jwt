import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../entity/usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { UsuarioRepository } from '../repository/usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRpository: UsuarioRepository) {}

  async getUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRpository.getUsuarios();
  }

  async getUsuario(id: number): Promise<Usuario> {
    return await this.usuarioRpository.getUsuario(id);
  }

  async createUsuario(createUsuario: CreateUsuarioDto) {
    const validation = await this.usuarioRpository.getUsuarioByEmail(
      createUsuario.email,
    );
    const validation2 = await this.usuarioRpository.getUserByUser(
      createUsuario.user,
    );
    try {
      if (validation) {
        throw new NotFoundException('Este correo ya existe');
      }
      if (validation2) {
        throw new NotFoundException('Este usuario ya existe');
      }
      return await this.usuarioRpository.createUsuario(createUsuario);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateUsuario(id: number, updateUsuario: UpdateUsuarioDto) {
    return await this.usuarioRpository.updateUsuario(id, updateUsuario);
  }
}
