import { IsEmail, IsString, Length, IsOptional } from 'class-validator';
export default class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @Length(6, 255)
  @IsOptional()
  password: string;
}
