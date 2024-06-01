import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { LoginUsuarioDto } from '../dto/loginusuario';
import { AuthService } from '../service/auth.service';
import { Request as ExpressRequest } from 'express';
import { Usuario } from 'src/usuario/entity/usuario.entity';

interface RequestWithUser extends ExpressRequest {
  user: Usuario;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async Login(@Body() loginDto: LoginUsuarioDto) {
    return await this.authService.login(loginDto);
  }

  @Get()
  async getMe(@Req() req: RequestWithUser) {
    const user = req.user;
    return { user };
  }
}
