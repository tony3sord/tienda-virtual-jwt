import { EntityManager } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from '../entity/producto.entity';
import { CreateProductoDto, UpdateProductoDto } from '../dto';
import { ProductoTalla } from '../entity/producto-talla.entity';

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
    const productoTallaRepository =
      this.dataSource.getRepository(ProductoTalla);

    let newProducto = new Producto();
    newProducto.title = producto.title;
    newProducto.description = producto.description;
    newProducto.images = producto.images;
    newProducto.slug = producto.slug;
    newProducto.tags = producto.tags;
    newProducto.types = producto.types;
    newProducto.gender = producto.gender;

    if (producto.tallas) {
      newProducto.tallas = await Promise.all(
        producto.tallas.map(async (tallaDto) => {
          let talla = new ProductoTalla();
          talla.size = tallaDto.size;
          talla.price = tallaDto.price;
          talla.amount = tallaDto.amount;
          return await productoTallaRepository.save(talla);
        }),
      );
    }

    return await productoRepository.save(newProducto);
  }

  async updateProducto(
    id: number,
    producto: UpdateProductoDto,
  ): Promise<Producto> {
    const productoRepository = this.dataSource.getRepository(Producto);
    const productoTallaRepository =
      this.dataSource.getRepository(ProductoTalla);

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
    if (producto.images !== undefined)
      productoToUpdate.images = producto.images;
    if (producto.slug !== undefined) productoToUpdate.slug = producto.slug;
    if (producto.tags !== undefined) productoToUpdate.tags = producto.tags;
    if (producto.types !== undefined) productoToUpdate.types = producto.types;
    if (producto.gender !== undefined)
      productoToUpdate.gender = producto.gender;

    // Actualizar las tallas
    if (producto.tallas !== undefined) {
      // Eliminar las tallas existentes
      await productoTallaRepository.delete({ producto: productoToUpdate });

      // Crear y asignar las nuevas tallas
      productoToUpdate.tallas = await Promise.all(
        producto.tallas.map(async (tallaDto) => {
          let talla = new ProductoTalla();
          talla.size = tallaDto.size;
          talla.price = tallaDto.price;
          talla.amount = tallaDto.amount;
          talla.producto = productoToUpdate;
          return await productoTallaRepository.save(talla);
        }),
      );
    }
    const a = await productoRepository.save(productoToUpdate);
    console.log(a);
    return a;
  }

  async getProducto(id: number): Promise<Producto> {
    const product = await this.dataSource
      .getRepository(Producto)
      .createQueryBuilder('producto')
      .where('producto.id = :id', { id })
      .getOne();
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async deleteProducto(id: number) {
    const productoRepository = this.dataSource.getRepository(Producto);
    const productoTallaRepository =
      this.dataSource.getRepository(ProductoTalla);

    await productoTallaRepository
      .createQueryBuilder()
      .delete()
      .from(ProductoTalla)
      .where('productoId = :id', { id })
      .execute();

    const productoToDelete = await productoRepository
      .createQueryBuilder('producto')
      .where('producto.id = :id', { id })
      .getOne();

    if (!productoToDelete) {
      throw new NotFoundException();
    }

    await productoRepository.remove(productoToDelete);

    return 'Producto eliminado correctamente';
  }

  async getProdutcName(name: string): Promise<Producto> {
    return await this.dataSource
      .getRepository(Producto)
      .createQueryBuilder('producto')
      .where('producto.title = :name', { name })
      .getOne();
  }
}
