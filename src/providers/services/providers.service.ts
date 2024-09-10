import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from 'src/usuario/dto';

@Injectable()
export class ProvidersService {
  async createProviders(usuario: CreateUsuarioDto) {
    return 0;
  }
  async updateProviders(id: number, usuario: UpdateUsuarioDto) {
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
