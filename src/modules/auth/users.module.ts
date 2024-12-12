/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: Module for managing user-related functionality. Imports necessary services, controllers, and entities.
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.entity";

/**
 * UsersModule imports TypeOrmModule for User entity and the related controller and service.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
