import { Injectable } from '@nestjs/common';
import { CreateProvidersDto } from '../dto/createproviders.dto';

@Injectable()
export class ProvidersService {
  async createProviders(usuario: CreateProvidersDto) {
    return 0;
  }
  async getProviders() {
    return 0;
  }
  async getProvider(id: number) {
    return 0;
  }
  async deleteProvider(id: number) {
    return 0;
  }
}
