import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({ description: 'El nombre del usuario.' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ description: 'El apellido del usuario.' })
  @IsString()
  @IsOptional()
  readonly lastname?: string;

  @ApiProperty({ description: 'El nombre de usuario del usuario.' })
  @IsString()
  @IsOptional()
  readonly user?: string;

  @ApiProperty({ description: 'El correo del usuario.' })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({ description: 'El rol del usuario.' })
  @IsOptional()
  @IsIn(['Admin', 'Client', 'SuperAdmin'])
  readonly role?: 'Admin' | 'Client' | 'SuperAdmin';
}
