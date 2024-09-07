import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductoTalla } from './producto-talla.entity';
import { Type } from 'class-transformer';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  images: string[];

  @Column()
  slug: string;

  @Column({ nullable: true })
  inStock: number;

  @Column('text', { array: true })
  tags: string[];

  @OneToMany(() => ProductoTalla, (productoTalla) => productoTalla.producto)
  @Type(() => ProductoTalla)
  tallas: ProductoTalla[];

  @Column()
  types: string;

  @Column()
  gender: string;
}
