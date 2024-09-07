import { Providers } from 'src/providers/entity/providers.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  //Columna primaria autoincremental
  @PrimaryGeneratedColumn()
  id: number;
  //Columna de tipo texto
  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  user: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToOne(() => Providers, (providers) => providers.usuario, {
    nullable: true,
  })
  providers: Providers;
}
