import { Controller, Param } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { ProductoService } from "../service/producto.service";

@Controller("producto")
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}
  @Get()
  async listarProductos() {
    return await this.productoService.listarProductos();
  }
  @Get(":id")
  async obtenerProducto(@Param("id") id: number) {
    return await this.obtenerProducto(id);
  }
}
