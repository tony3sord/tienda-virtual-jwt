import { IsEmail, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  readonly name: string;
  readonly lastname: string;
  readonly user: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  readonly role: 'Admin' | 'Client' | 'SuperAdmin';
}
