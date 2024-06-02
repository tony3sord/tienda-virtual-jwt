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
    try {
      const validation = await this.usuarioRpository.getUsuario(id);
      if (!validation) {
        throw new NotFoundException('Usuario no encontrado');
      } else {
        const validarEmail = await this.usuarioRpository.getUsuarioByEmail(
          updateUsuario.email,
        );
        if (validarEmail && validarEmail.id != id) {
          throw new NotFoundException('Este correo ya existe');
        }
        const validarUsuario = await this.usuarioRpository.getUserByUser(
          updateUsuario.user,
        );
        if (validarUsuario && validarUsuario.id != id) {
          throw new NotFoundException('Este usuario ya existe');
        }
        return await this.usuarioRpository.updateUsuario(id, updateUsuario);
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async deleteUsuario(id: number, password: string) {
    try {
      const validation = await this.usuarioRpository.getUsuario(id);
      if (!validation) {
        throw new NotFoundException('Usuario no encontrado');
      } else {
        const validarPassword = bcrypt.compareSync(
          password,
          validation.password,
        );
        if (validarPassword == false) {
          throw new NotFoundException('Contraseña incorrecta');
        }
        return await this.usuarioRpository.deleteUsuario(id);
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
