import { Module } from '@nestjs/common';
import { ProductoController } from './controller/producto.controller';
import { ProductoService } from './service/producto.service';
import { ProductoRepository } from './repository/producto.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entity/producto.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), AuthModule, UsuarioModule],
  controllers: [ProductoController],
  providers: [ProductoService, ProductoRepository],
})
export class ProductoModule {}
