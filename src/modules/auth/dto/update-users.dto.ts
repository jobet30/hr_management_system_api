/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: DTO for updating a user. It defines the structure and validation rules for updating user data.
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import { IsString, IsOptional, MinLength, IsNotEmpty } from "class-validator";

/**
 * UpdateUserDto defines the structure and validation for updating an existing user.
 */
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  fullName?: string;
}
