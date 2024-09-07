import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoTalla } from 'src/producto/entity/producto-talla.entity';
import { Producto } from 'src/producto/entity/producto.entity';
import { Usuario } from 'src/usuario/entity/usuario.entity';
import { Providers } from 'src/providers/entity/providers.entity';

export const TypeOrmConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  entities: [ProductoTalla, Producto, Usuario, Providers],
  synchronize: true,
});
