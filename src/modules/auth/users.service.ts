/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: Service for handling the business logic related to users. It interacts with the database to perform create, read, and update operations.
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-users.dto";
import { UpdateUserDto } from "./dto/update-users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";

/**
 * UsersService contains the logic for interacting with user data.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user in the database.
   * @param createUserDto - DTO containing user creation data
   * @returns The created user
   */
  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  /**
   * Fetches all users from the database.
   * @returns An array of users
   */
  findAll() {
    return this.usersRepository.find();
  }

  /**
   * Fetches a user by ID.
   * @param id - The ID of the user
   * @returns The user object or null if not found
   */
  async findOne(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  /**
   * Updates a user by ID with the provided data.
   * @param id - The ID of the user to update
   * @param updateUserDto - DTO containing user update data
   * @returns The updated user object
   */
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    const result = await this.usersRepository.update(id, updateUserDto);
    return result;
  }
}
