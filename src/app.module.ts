import { Module, OnModuleInit } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { ProductoModule } from './producto/producto.module';
import { UsuarioRepository } from './usuario/repository/usuario.repository';
import { CreateUsuarioDto } from './usuario/dto';
import { ProductoTalla } from './producto/entity/producto-talla.entity';
import { Producto } from './producto/entity/producto.entity';
import { Usuario } from './usuario/entity/usuario.entity';
dotenv.config();

@Module({
  imports: [
    UsuarioModule,
    ProductoModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [ProductoTalla, Producto, Usuario],
      synchronize: true,
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private userService: UsuarioRepository) {}

  async onModuleInit() {
    const adminUser = await this.userService.getSuperAdmin();
    if (!adminUser) {
      const user: CreateUsuarioDto = {
        name: process.env.USER_NAME,
        email: process.env.USER_EMAIL,
        lastname: process.env.USER_LASTNAME,
        user: process.env.USER_USER,
        password: process.env.USER_PASSWORD,
        role: 'SuperAdmin',
      };
      await this.userService.createUsuario(user);
    }
  }
}
