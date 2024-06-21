import {
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ProductoService } from '../service/producto.service';
import { ApiBody, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { CreateProductoDto, UpdateProductoDto } from '../dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';

@UseGuards(RolesGuard)
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  async listarProductos() {
    return await this.productoService.listarProductos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por Id' })
  async obtenerProducto(@Param('id') id: number) {
    return await this.obtenerProducto(id);
  }

  @Post()
  @Roles('Admin', 'SuperAdmin')
  @ApiBody({ type: CreateProductoDto })
  @ApiOperation({ summary: 'Crear un producto' })
  async createProducto(createProducto: CreateProductoDto) {
    return await this.productoService.createProducto(createProducto);
  }

  @Patch(':id')
  @Roles('Admin', 'SuperAdmin')
  @ApiBody({ type: UpdateProductoDto })
  @ApiOperation({ summary: 'Actualizar un producto' })
  async updateProducto(
    @Param('id') id: number,
    updateProducto: UpdateProductoDto,
  ) {
    return await this.productoService.updateProducto(id, updateProducto);
  }

  @Delete(':id')
  @Roles('Admin', 'SuperAdmin')
  @ApiOperation({ summary: 'Eliminar un producto' })
  async deleteProducto(@Param('id') id: number) {
    return await this.productoService.deleteProducto(id);
  }
}
