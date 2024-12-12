/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: DTO for creating a user. It defines the structure and validation rules for the user creation data.
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import { IsString, IsEmail, MinLength } from "class-validator";

/**
 * CreateUserDto defines the structure and validation for creating a new user.
 */
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  fullName: string;
}
