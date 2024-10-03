import { Injectable } from '@nestjs/common';
import { CreateProvidersDto } from '../dto/createproviders.dto';
import { ProvidersRepository } from '../repository/providers.repository';
import { Providers } from '../entity/providers.entity';

@Injectable()
export class ProvidersService {
  constructor(private readonly providersRepository: ProvidersRepository) {}

  async createProviders(providers: CreateProvidersDto): Promise<Providers> {
    return await this.providersRepository.createProviders(providers);
  }

  async getProviders(): Promise<Providers[]> {
    return await this.providersRepository.getProviders();
  }

  async getProvider(id: number): Promise<Providers> {
    return await this.providersRepository.getProvider(id);
  }

  async getProvidersForUser(user: string): Promise<Providers | boolean> {
    return await this.providersRepository.getProvidersForUser(user);
  }

  async deleteProvider(id: number): Promise<String> {
    return await this.providersRepository.deleteProvider(id);
  }
}
