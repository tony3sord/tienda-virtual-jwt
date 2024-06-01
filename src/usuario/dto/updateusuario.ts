import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({ description: 'El nombre del usuario.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'El apellido del usuario.' })
  @IsString()
  readonly lastname: string;

  @ApiProperty({ description: 'El nombre de usuario del usuario.' })
  @IsString()
  readonly user: string;

  @ApiProperty({ description: 'El correo del usuario.' })
  @IsEmail()
  readonly email: string;
}
