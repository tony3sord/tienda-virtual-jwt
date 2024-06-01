import { Module, OnModuleInit } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { ProductoModule } from './producto/producto.module';
import { UsuarioRepository } from './usuario/repository/usuario.repository';
import { CreateUsuarioDto } from './usuario/dto';
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
      synchronize: true,
    }),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private userService: UsuarioRepository) {}

  async onModuleInit() {
    const adminUser = await this.userService.getSuperAdmin();
    const user: CreateUsuarioDto = {
      name: 'Super Admin',
      email: 'super@gmail.com',
      lastname: 'Super Admin',
      user: 'super',
      password: '1234',
      role: 'SuperAdmin',
    };
    if (!adminUser) {
      await this.userService.createUsuario(user);
    }
  }
}
