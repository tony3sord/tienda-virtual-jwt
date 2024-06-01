import * as dotenv from 'dotenv';
import { UsuarioRepository } from 'src/usuario/repository/usuario.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUsuarioDto } from '../dto/loginusuario';
import { JwtService } from '@nestjs/jwt';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: any) {
    return await this.usuarioRepository.getUsuario(payload.sub);
  }

  async login(user: LoginUsuarioDto) {
    const payload = { user: user.email };
    const token = {
      token: this.jwtService.sign(payload, {
        secret: process.env.AUTH_TOKEN,
      }),
    };
    return token;
  }

  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: process.env.AUTH_TOKEN });
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
