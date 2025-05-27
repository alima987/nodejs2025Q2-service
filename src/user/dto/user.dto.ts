import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  login: string;

  @IsString()
  @MinLength(1)
  password: string;
}

export class UpdatePasswordDto {
   @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}