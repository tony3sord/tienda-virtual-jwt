import { EntityManager } from 'typeorm';
import { Producto } from '../entity/producto.entity';
import { CreateProductoDto, UpdateProductoDto } from '../dto';

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

    productoToUpdate.title = producto.title;
    productoToUpdate.description = producto.description;
    productoToUpdate.amount = producto.amount;
    productoToUpdate.images = producto.images;
    productoToUpdate.price = producto.price;
    productoToUpdate.slug = producto.slug;
    productoToUpdate.inStock = producto.inStock;
    productoToUpdate.tags = producto.tags;
    productoToUpdate.sizes = [...producto.sizes.map(String)];
    productoToUpdate.types = producto.types;
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
}
