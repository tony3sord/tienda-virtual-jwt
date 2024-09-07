import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductoRepository } from '../repository/producto.repository';
import { CreateProductoDto, UpdateProductoDto } from '../dto';

@Injectable()
export class ProductoService {
  constructor(private readonly productoRepository: ProductoRepository) {}
  async listarProductos() {
    return await this.productoRepository.getProductos();
  }
  async obtenerProducto(id: number) {
    return await this.productoRepository.getProducto(id);
  }

  async createProducto(createProducto: CreateProductoDto) {
    try {
      const validation = await this.productoRepository.getProdutcName(
        createProducto.title,
      );
      if (validation) {
        throw new ConflictException();
      }
      return await this.productoRepository.createProducto(createProducto);
    } catch (error) {
      console.log(error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async updateProducto(id: number, updateProducto: UpdateProductoDto) {
    try {
      const validation = await this.productoRepository.getProdutcName(
        updateProducto.title,
      );
      if (validation && validation.id !== id) {
        throw new ConflictException();
      }
      return await this.productoRepository.updateProducto(id, updateProducto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async deleteProducto(id: number) {
    return await this.productoRepository.deleteProducto(id);
  }
}
