import { Injectable } from '@nestjs/common';
import { ProductoRepository } from '../repository/producto.repository';

@Injectable()
export class ProductoService {
  constructor(private readonly productoRepository: ProductoRepository) {}
  async listarProductos() {
    return await this.productoRepository.getProductos();
  }
  async obtenerProducto(id: number) {
    return await this.productoRepository.getProducto(id);
  }

  async createProducto(createProducto) {
    return await this.productoRepository.createProducto(createProducto);
  }

  async updateProducto(id: number, updateProducto) {
    return await this.productoRepository.updateProducto(id, updateProducto);
  }
}
