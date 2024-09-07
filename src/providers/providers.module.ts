import { Module } from '@nestjs/common';
import { ProvidersController } from './controllers/providers.controller';
import { ProvidersService } from './services/providers.service';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
