import { IsEmail, IsString, Length } from 'class-validator';
export default class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @Length(6, 255)
  password: string;
}
