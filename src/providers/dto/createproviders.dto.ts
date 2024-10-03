import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/entity/usuario.entity';

export class CreateProvidersDto {
  @ApiProperty({ description: 'El título del producto.' })
  @IsString()
  @IsNotEmpty()
  readonly usuario: Usuario;
}
