/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: Controller for managing users in the system. Handles requests related to creating, updating, and retrieving user information.
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import { Controller, Get, Post, Body, Param, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-users.dto";
import { UpdateUserDto } from "./dto/update-users.dto";

/**
 * UsersController handles the HTTP requests for user-related operations.
 */
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
export { UsersService };
