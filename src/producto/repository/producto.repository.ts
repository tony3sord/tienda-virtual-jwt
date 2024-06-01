import { Repository } from 'typeorm';
import { Producto } from '../entity/producto.entity';
import { CreateProductoDto, UpdateProductoDto } from '../dto';

export class ProductoRepository extends Repository<Producto> {
  async getProductos(): Promise<Producto[]> {
    return await this.find();
  }
  async insertProducto(producto: CreateProductoDto): Promise<Producto> {
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
    return await this.save(newProducto);
  }

  async updateProducto(
    id: number,
    producto: UpdateProductoDto,
  ): Promise<Producto> {
    const productoToUpdate = await this.findOne({ where: { id: id } });
    if (!productoToUpdate) {
      throw new Error('Usuario not found');
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
    return await this.save(productoToUpdate);
  }

  async getProducto(id: number): Promise<Producto> {
    return await this.findOne({ where: { id: id } });
  }
}
