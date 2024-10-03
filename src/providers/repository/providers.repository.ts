import { EntityManager } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Providers } from '../entity/providers.entity';
import { CreateProvidersDto } from '../dto/createproviders.dto';

@Injectable()
export class ProvidersRepository {
  constructor(private dataSource: EntityManager) {}

  async getProviders(): Promise<Providers[]> {
    return await this.dataSource
      .getRepository(Providers)
      .createQueryBuilder('providers')
      .getMany();
  }

  async createProviders(providers: CreateProvidersDto): Promise<Providers> {
    const providersRepository = this.dataSource.getRepository(Providers);

    let newProviders = new Providers();
    newProviders.usuario = providers.usuario;
    return await providersRepository.save(newProviders);
  }

  async getProvider(id: number): Promise<Providers> {
    const provider = await this.dataSource
      .getRepository(Providers)
      .createQueryBuilder('providers')
      .where('providers.id = :id', { id })
      .getOne();
    if (!provider) {
      throw new NotFoundException();
    }
    return provider;
  }

  async deleteProvider(id: number): Promise<String> {
    const providersRepository = this.dataSource.getRepository(Providers);

    const providerToDelete = await providersRepository
      .createQueryBuilder('providers')
      .where('providers.id = :id', { id })
      .getOne();

    if (!providerToDelete) {
      throw new NotFoundException();
    }

    await providersRepository.remove(providerToDelete);

    return 'Proveedor eliminado correctamente';
  }

  async getProvidersForUser(user: string): Promise<Providers | boolean> {
    const provider = await this.dataSource
      .getRepository(Providers)
      .createQueryBuilder('providers')
      .where('providers.usuario = :user', { user })
      .getOne();
    return provider ? provider : false;
  }
}
