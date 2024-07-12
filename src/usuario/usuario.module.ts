import { Module, forwardRef } from '@nestjs/common';
import { UsuarioController } from './controller/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { UsuarioRepository } from './repository/usuario.repository';
import { Usuario } from './entity/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepository],
  exports: [UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}
