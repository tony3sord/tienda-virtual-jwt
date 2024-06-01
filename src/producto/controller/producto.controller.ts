import { Controller, Param, Patch, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { ProductoService } from '../service/producto.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateProductoDto, UpdateProductoDto } from '../dto';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}
  @Get()
  async listarProductos() {
    return await this.productoService.listarProductos();
  }
  @Get(':id')
  async obtenerProducto(@Param('id') id: number) {
    return await this.obtenerProducto(id);
  }

  @Post()
  @ApiBody({ type: CreateProductoDto })
  async createProducto(createProducto: CreateProductoDto) {
    return await this.productoService.createProducto(createProducto);
  }

  @Patch(':id')
  async updateProducto(
    @Param('id') id: number,
    updateProducto: UpdateProductoDto,
  ) {
    return await this.productoService.updateProducto(id, updateProducto);
  }
}
