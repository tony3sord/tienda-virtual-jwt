import { IsEmail, IsString } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  readonly name: string;
  readonly lastname: string;
  readonly user: string;
  @IsEmail()
  readonly email: string;
}
