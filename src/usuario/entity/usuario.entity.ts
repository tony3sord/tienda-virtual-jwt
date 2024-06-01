import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
