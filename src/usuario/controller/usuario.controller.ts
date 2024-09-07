import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dto';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entity/usuario.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { AuthService } from 'src/auth/service/auth.service';

@ApiTags('User CRUD')
@UseGuards(RolesGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioservice: UsuarioService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Roles('Admin', 'SuperAdmin')
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
    @Req() req,
  ): Promise<Usuario> {
    const user = await this.authService.getMe(req);
    if (user.id !== id && user.role !== 'SuperAdmin') {
      throw new UnauthorizedException(
        'No tienes permisos para realizar esta acción',
      );
    }
    return await this.usuarioservice.updateUsuario(id, usuario);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar Usuario' })
  async deleteUsuario(
    @Param('id') id: number,
    @Body() password: string,
    @Req() req,
  ) {
    const user = await this.authService.getMe(req);
    if (user.id !== id && user.role !== 'SuperAdmin') {
      throw new UnauthorizedException(
        'No tienes permisos para realizar esta acción',
      );
    }
    return await this.usuarioservice.deleteUsuario(id, password);
  }
}
