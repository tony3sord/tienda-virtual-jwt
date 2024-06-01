import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entity/usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioservice: UsuarioService) {}

  @Get()
  async getUsuarios(): Promise<Usuario[]> {
    return await this.usuarioservice.getUsuarios();
  }

  @Get(':id')
  async getUsuarioById(@Param('id') parametro: number): Promise<Usuario> {
    return await this.usuarioservice.getUsuario(parametro);
  }

  @Post()
  async createUsuario(@Body() usuario: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioservice.createUsuario(usuario);
  }

  @Patch(':id')
  async updateUsuario(
    @Param('id') id: number,
    @Body() usuario: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return await this.usuarioservice.updateUsuario(id, usuario);
  }
}
