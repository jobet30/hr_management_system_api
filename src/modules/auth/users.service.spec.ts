/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: Test suite for UsersService. Ensures the business logic for user-related operations is implemented correctly.
 * Date: 2024-12-12
 * Version: 1.0.0
 */

import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";

describe("UsersService", () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a user", async () => {
    const createUserDto = {
      email: "test@example.com",
      password: "password123",
      fullName: "Test User",
    };

    const createdUser = {
      id: "uuid",
      ...createUserDto,
    };

    jest.spyOn(repository, "create").mockReturnValue(createdUser as any);
    jest.spyOn(repository, "save").mockResolvedValue(createdUser as any);

    const result = await service.create(createUserDto);
    expect(repository.create).toHaveBeenCalledWith(createUserDto);
    expect(repository.save).toHaveBeenCalledWith(createdUser);
    expect(result).toEqual(createdUser);
  });

  it("should find all users", async () => {
    const users = [
      {
        id: "uuid1",
        email: "test1@example.com",
        password: "password1",
        fullName: "User One",
      },
      {
        id: "uuid2",
        email: "test2@example.com",
        password: "password2",
        fullName: "User Two",
      },
    ];

    jest.spyOn(repository, "find").mockResolvedValue(users as any);

    const result = await service.findAll();
    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it("should find one user by ID", async () => {
    const user = {
      id: "uuid1",
      email: "test1@example.com",
      password: "password1",
      fullName: "User One",
    };

    jest.spyOn(repository, "findOne").mockResolvedValue(user as any);

    const result = await service.findOne("uuid1");
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: "uuid1" } });
    expect(result).toEqual(user);
  });

  it("should update a user", async () => {
    const updateUserDto = { fullName: "Updated User" };

    jest.spyOn(repository, "findOne").mockResolvedValue({ id: "uuid1" } as any);
    jest.spyOn(repository, "update").mockResolvedValue({ affected: 1 } as any);
    const result = await service.update("uuid1", updateUserDto);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: "uuid1" } });
    expect(repository.update).toHaveBeenCalledWith("uuid1", updateUserDto);
    expect(result).toEqual({ affected: 1 });
  });
});
