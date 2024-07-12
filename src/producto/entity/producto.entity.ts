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

  @Column('text', { array: true })
  images: string[];

  @Column()
  price: number;

  @Column()
  slug: string;

  @Column()
  inStock: number;

  @Column('text', { array: true })
  tags: string[];

  @Column('text', { array: true })
  sizes: string[];

  @Column()
  types: string;

  @Column()
  gender: string;
}
