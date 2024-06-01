import { IsEmail, IsString } from "class-validator";

export class LoginUsuarioDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
}
