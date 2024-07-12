import { EntityManager } from 'typeorm';
import { Producto } from '../entity/producto.entity';
import { CreateProductoDto, UpdateProductoDto } from '../dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductoRepository {
  constructor(private dataSource: EntityManager) {}

  async getProductos(): Promise<Producto[]> {
    return await this.dataSource
      .getRepository(Producto)
      .createQueryBuilder('producto')
      .getMany();
  }

  async createProducto(producto: CreateProductoDto): Promise<Producto> {
    const productoRepository = this.dataSource.getRepository(Producto);
    let newProducto = new Producto();
    newProducto.title = producto.title;
    newProducto.description = producto.description;
    newProducto.amount = producto.amount;
    newProducto.images = producto.images;
    newProducto.price = producto.price;
    newProducto.slug = producto.slug;
    newProducto.inStock = producto.inStock;
    newProducto.tags = producto.tags;
    newProducto.sizes = [...producto.sizes.map(String)];
    newProducto.types = producto.types;
    newProducto.gender = producto.gender;
    return await productoRepository.save(newProducto);
  }

  async updateProducto(
    id: number,
    producto: UpdateProductoDto,
  ): Promise<Producto> {
    const productoRepository = this.dataSource.getRepository(Producto);
    const productoToUpdate = await productoRepository
      .createQueryBuilder('producto')
      .where('producto.id = :id', { id })
      .getOne();

    if (!productoToUpdate) {
      throw new Error('Producto not found');
    }
    if (producto.title !== undefined) productoToUpdate.title = producto.title;
    if (producto.description !== undefined)
      productoToUpdate.description = producto.description;
    if (producto.amount !== undefined)
      productoToUpdate.amount = producto.amount;
    if (producto.images !== undefined)
      productoToUpdate.images = producto.images;
    if (producto.price !== undefined) productoToUpdate.price = producto.price;
    if (producto.slug !== undefined) productoToUpdate.slug = producto.slug;
    if (producto.inStock !== undefined)
      productoToUpdate.inStock = producto.inStock;
    if (producto.tags !== undefined) productoToUpdate.tags = producto.tags;
    if (producto.sizes !== undefined)
      productoToUpdate.sizes = [...producto.sizes.map(String)];
    if (producto.types !== undefined) productoToUpdate.types = producto.types;
    if (producto.gender !== undefined)
      productoToUpdate.gender = producto.gender;

    return await productoRepository.save(productoToUpdate);
  }

  async getProducto(id: number): Promise<Producto> {
    return await this.dataSource
      .getRepository(Producto)
      .createQueryBuilder('producto')
      .where('producto.id = :id', { id })
      .getOne();
  }

  async deleteProducto(id: number) {
    const productoRepository = this.dataSource.getRepository(Producto);
    const productoToDelete = await productoRepository
      .createQueryBuilder('producto')
      .where('producto.id = :id', { id })
      .getOne();
    if (!productoToDelete) {
      throw new Error('Producto not found');
    }
    return await productoRepository.remove(productoToDelete);
  }
}
