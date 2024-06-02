import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entity/usuario.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioservice: UsuarioService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los Usuarios' })
  async getUsuarios(): Promise<Usuario[]> {
    return await this.usuarioservice.getUsuarios();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener Usuario por Id' })
  async getUsuarioById(@Param('id') parametro: number): Promise<Usuario> {
    return await this.usuarioservice.getUsuario(parametro);
  }

  @Post()
  @ApiOperation({ summary: 'Crear Usuario' })
  @UsePipes(new ValidationPipe())
  async createUsuario(@Body() usuario: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioservice.createUsuario(usuario);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar Usuario' })
  @UsePipes(new ValidationPipe())
  async updateUsuario(
    @Param('id') id: number,
    @Body() usuario: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return await this.usuarioservice.updateUsuario(id, usuario);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Usuario' })
  async deleteUsuario(@Param('id') id: number, @Body() password: string) {
    return await this.usuarioservice.deleteUsuario(id, password);
  }
}
