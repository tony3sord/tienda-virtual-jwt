import { EntityManager } from 'typeorm';
import { Usuario } from '../entity/usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioRepository {
  constructor(private dataSource: EntityManager) {}

  async buscarPorId(id: string) {
    const user = await this.dataSource
      .getRepository(Usuario)
      .createQueryBuilder('usuario')
      .where({ id: id })
      .getOne();
    if (!user) throw new NotFoundException();
    return user;
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

    if (usuario.name !== undefined) {
      usuarioToUpdate.name = usuario.name;
    }

    if (usuario.lastname !== undefined) {
      usuarioToUpdate.lastname = usuario.lastname;
    }

    if (usuario.email !== undefined) {
      usuarioToUpdate.email = usuario.email;
    }

    if (usuario.user !== undefined) {
      usuarioToUpdate.user = usuario.user;
    }
    if (usuario.role !== undefined) {
      usuarioToUpdate.role = usuario.role;
    }

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

  async getUserByUser(user: string) {
    return await this.dataSource
      .getRepository(Usuario)
      .createQueryBuilder('usuario')
      .where({ user: user })
      .getOne();
  }

  async deleteUsuario(id: number) {
    return await this.dataSource
      .getRepository(Usuario)
      .createQueryBuilder('usuario')
      .where({ id: id })
      .delete();
  }
}
