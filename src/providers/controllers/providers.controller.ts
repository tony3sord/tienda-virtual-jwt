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
  UseGuards,
} from '@nestjs/common';
import { CreateUsuarioDto, UpdateUsuarioDto } from 'src/usuario/dto';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorators';
import { ProvidersService } from '../services/providers.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateProvidersDto } from '../dto/createproviders.dto';

@ApiTags('Providers CRUD')
@UseGuards(RolesGuard)
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @ApiBody({ type: CreateProvidersDto })
  @ApiOperation({ summary: 'Insertar un proveedor' })
  @UsePipes(new ValidationPipe())
  async createProviders(@Body() providers: CreateProvidersDto) {
    return await this.providersService.createProviders(providers);
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
