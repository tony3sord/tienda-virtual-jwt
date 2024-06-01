import { Module } from "@nestjs/common";
import { ProductoController } from "./controller/producto.controller";
import { ProductoService } from "./service/producto.service";
import { ProductoRepository } from "./repository/producto.repository";

@Module({
  controllers: [ProductoController],
  providers: [ProductoService, ProductoRepository],
})
export class ProductoModule {}
