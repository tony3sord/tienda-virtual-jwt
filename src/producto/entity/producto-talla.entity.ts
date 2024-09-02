import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Producto } from './producto.entity';

@Entity()
export class ProductoTalla {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  amount: number;

  @ManyToOne(() => Producto, (producto) => producto.tallas)
  @JoinColumn({ name: 'productoId' })
  producto: Producto;
}
