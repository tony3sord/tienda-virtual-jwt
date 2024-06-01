import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Producto {
  //Columna primaria autoincremental
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @Column()
  images: string[];

  @Column()
  price: number;

  @Column()
  slug: string;

  @Column()
  inStock: number;

  @Column()
  tags: string[];

  @Column()
  sizes: string[];

  @Column()
  types: string;

  @Column()
  gender: string;
}
