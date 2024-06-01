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
    return await this.usuarioRpository.createUsuario(createUsuario);
  }

  async updateUsuario(id: number, updateUsuario: UpdateUsuarioDto) {
    return await this.usuarioRpository.updateUsuario(id, updateUsuario);
  }
}
