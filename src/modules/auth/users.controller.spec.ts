/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: Test file for the UsersController, ensuring that the controller methods call the service methods correctly.
 * Date: 2024-12-12
 * Version: 1.0.0
 */

import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-users.dto";
import { UpdateUserDto } from "./dto/update-users.dto";
import { User } from "./users.entity";

/**
 * Test suite for UsersController.
 * It tests all the HTTP request handling methods (POST, GET, PUT) and ensures they call the corresponding methods in UsersService.
 */
describe("UsersController", () => {
  let usersController: UsersController;
  let usersService: UsersService;

  /**
   * Setup before each test.
   * Creates a testing module with mocked UsersService.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  /**
   * Test for creating a user.
   * Verifies that the controller calls the UsersService.create method with the correct DTO.
   */
  describe("create", () => {
    it("should call the UsersService.create method with the correct DTO", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        password: "password123",
        fullName: "Test User",
      };
      const createUserResponse: Partial<User> = { ...createUserDto, id: "1" };
      (usersService.create as jest.Mock).mockResolvedValue(createUserResponse);

      const result = await usersController.create(createUserDto);

      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createUserResponse);
    });
  });

  /**
   * Test for retrieving all users.
   * Verifies that the controller calls the UsersService.findAll method and returns the correct data.
   */
  describe("findAll", () => {
    it("should call the UsersService.findAll method and return the correct data", async () => {
      const users: Partial<User>[] = [
        {
          id: "1",
          email: "test1@example.com",
          password: "password123",
          fullName: "User One",
        },
        {
          id: "2",
          email: "test2@example.com",
          password: "password456",
          fullName: "User Two",
        },
      ];
      (usersService.findAll as jest.Mock).mockResolvedValue(users);

      const result = await usersController.findAll();

      expect(usersService.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  /**
   * Test for retrieving a single user by ID.
   * Verifies that the controller calls the UsersService.findOne method with the correct ID.
   */
  describe("findOne", () => {
    it("should call the UsersService.findOne method with the correct id", async () => {
      const userId = "1";
      const user: Partial<User> = {
        id: userId,
        email: "test@example.com",
        password: "password123",
        fullName: "Test User",
      };
      (usersService.findOne as jest.Mock).mockResolvedValue(user);

      const result = await usersController.findOne(userId);

      expect(usersService.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  });

  /**
   * Test for updating a user by ID.
   * Verifies that the controller calls the UsersService.update method with the correct ID and DTO.
   */
  describe("update", () => {
    it("should call the UsersService.update method with the correct parameters", async () => {
      const userId = "1";
      const updateUserDto: UpdateUserDto = { fullName: "Updated User" };
      const updatedUser: Partial<User> = {
        id: userId,
        email: "test@example.com",
        password: "password123",
        fullName: "Updated User",
      };

      (usersService.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await usersController.update(userId, updateUserDto);

      expect(usersService.update).toHaveBeenCalledWith(userId, updateUserDto);
      expect(result).toEqual(updatedUser);
    });
  });
});
