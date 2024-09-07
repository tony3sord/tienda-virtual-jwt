import { Module, OnModuleInit } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './producto/producto.module';
import { UsuarioRepository } from './usuario/repository/usuario.repository';
import { CreateUsuarioDto } from './usuario/dto';
import { ProvidersModule } from './providers/providers.module';
import { TypeOrmConfig } from './common/config/typeOrm.config';

@Module({
  imports: [
    TypeOrmConfig,
    UsuarioModule,
    ProductoModule,
    AuthModule,
    ProvidersModule,
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
