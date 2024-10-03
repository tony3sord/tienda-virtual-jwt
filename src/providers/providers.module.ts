import { Module } from '@nestjs/common';
import { ProvidersController } from './controllers/providers.controller';
import { ProvidersService } from './services/providers.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService],
  imports: [AuthModule, UsuarioModule],
})
export class ProvidersModule {}
