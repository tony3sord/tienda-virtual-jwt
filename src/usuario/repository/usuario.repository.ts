import { EntityManager } from 'typeorm';
import { Usuario } from '../entity/usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioRepository {
  constructor(private dataSource: EntityManager) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Usuario)
      .createQueryBuilder('usuario')
      .where({ id: id })
      .getOne();
  }

  async getUsuarios(): Promise<Usuario[]> {
    return await this.dataSource
      .getRepository(Usuario)
      .createQueryBuilder('usuario')
      .getMany();
  }

  async updateUsuario(id: number, usuario: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioRepository = this.dataSource.getRepository(Usuario);
    const usuarioToUpdate = await usuarioRepository
      .createQueryBuilder('usuario')
      .where('usuario.id = :id', { id })
      .getOne();

    if (!usuarioToUpdate) {
      throw new Error('Usuario not found');
    }

    usuarioToUpdate.name = usuario.name;
    usuarioToUpdate.lastname = usuario.lastname;
    usuarioToUpdate.email = usuario.email;
    usuarioToUpdate.user = usuario.user;

    return await usuarioRepository.save(usuarioToUpdate);
  }

  async createUsuario(usuario: CreateUsuarioDto): Promise<Usuario> {
    const usuarioRepository = this.dataSource.getRepository(Usuario);
    const usuarioNew = new Usuario();
    usuarioNew.name = usuario.name;
    usuarioNew.lastname = usuario.lastname;
    usuarioNew.email = usuario.email;
    usuarioNew.user = usuario.user;
    const saltRounds = 10;
    usuarioNew.password = bcrypt.hashSync(usuario.password, saltRounds);
    usuarioNew.role = usuario.role;

    return usuarioRepository.save(usuarioNew);
  }

  async getUsuario(id: number): Promise<Usuario> {
    return await this.dataSource
      .getRepository(Usuario)
      .createQueryBuilder('usuario')
      .where({ id: id })
      .getOne();
  }

  async getUsuarioByEmail(email: string) {
    return await this.dataSource
      .getRepository(Usuario)
      .createQueryBuilder('usuario')
      .where({ email: email })
      .getOne();
  }

  async getSuperAdmin() {
    return await this.dataSource
      .getRepository(Usuario)
      .createQueryBuilder('usuario')
      .where({ role: 'SuperAdmin' })
      .getOne();
  }
}