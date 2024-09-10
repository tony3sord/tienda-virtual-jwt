import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Delete,
  Param,
  UsePipes,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from 'src/usuario/dto';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorators';
import { ProvidersService } from '../services/providers.service';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @ApiBody({ type: CreateUsuarioDto })
  @ApiOperation({ summary: 'Insertar un proveedor' })
  @UsePipes(new ValidationPipe())
  async createProviders(@Body() usuario: CreateUsuarioDto) {
    return await this.providersService.createProviders(usuario);
  }

  @Patch(':id')
  @HttpCode(204)
  @Roles('SuperAdmin', 'Admin')
  @ApiBody({ type: UpdateUsuarioDto })
  @ApiOperation({ summary: 'Editar un proveedor' })
  async updateProviders(
    @Param() id: number,
    @Body() usuario: UpdateUsuarioDto,
  ) {
    return await this.providersService.updateProviders(id, usuario);
  }

  @Get()
  @Roles('SuperAdmin')
  @ApiOperation({ summary: 'Obtener los proveedores' })
  async getProviders() {
    return await this.providersService.getProviders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proveedor' })
  async getProvider(@Param() id: number) {
    return 0;
  }

  @Delete(':id')
  @Roles('SuperAdmin', 'Admin')
  @ApiOperation({ summary: 'Eliminar un proveedor' })
  async deleteProvider(@Param() id: number) {
    return await this.providersService.deleteProvider(id);
  }
}
