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
    .setDescription(
      'Cuando se inicia el servidor la api busca un super admin y si no esta creado lo crea email:super@gmail.com,password:1234',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(port);
  console.log(
    `Server running, click here => http://127.0.0.1:${port}/documentation`,
  );
}

bootstrap();
