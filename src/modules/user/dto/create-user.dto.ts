import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @Length(6, 20)
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  // @IsArray()
  @IsEnum(Roles)
  roles: Roles;
}
