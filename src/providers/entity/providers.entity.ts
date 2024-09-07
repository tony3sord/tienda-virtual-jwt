import { Usuario } from 'src/usuario/entity/usuario.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Providers {
  //Columna primaria autoincremental
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Usuario, (usuario) => usuario.providers)
  @JoinColumn()
  usuario: Usuario;
}
