import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT);
  app.enableCors({});
  const config = new DocumentBuilder()
    .setTitle('API de la tienda Somos los mejores "Pinga"')
    .setDescription('La documentación de la API')
    .setVersion('1.0')
    .addTag('rutas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(port);
}

bootstrap();
