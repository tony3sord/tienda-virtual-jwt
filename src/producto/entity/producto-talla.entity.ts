import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Producto } from './producto.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class ProductoTalla {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  amount: number;

  @ManyToOne(() => Producto, (producto) => producto.tallas)
  @Exclude({ toPlainOnly: true })
  producto: Producto;
}
