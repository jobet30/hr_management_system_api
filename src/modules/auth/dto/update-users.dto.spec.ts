/* eslint-disable prettier/prettier */
/**
 * Test for UpdateUserDto to ensure proper validation for updating user data.
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import { UpdateUserDto } from "./update-users.dto";
import { validate } from "class-validator";

/**
 * Test suite for UpdateUserDto validation.
 */
describe("UpdateUserDto", () => {
  /**
   * Test to ensure UpdateUserDto is valid with correct data.
   */
  it("should be valid with correct data", async () => {
    const validUser = new UpdateUserDto();
    validUser.password = "Password123";
    validUser.fullName = "John Doe";

    const errors = await validate(validUser);

    expect(errors.length).toBe(0);
  });

  /**
   * Test to ensure validation fails if the password is too short.
   */
  it("should be invalid if password is too short", async () => {
    const shortPasswordUser = new UpdateUserDto();
    shortPasswordUser.password = "short";

    const errors = await validate(shortPasswordUser);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("password");
    expect(errors[0].constraints.minLength).toBeDefined();
  });

  /**
   * Test to ensure validation passes if the password is not provided (optional).
   */
  it("should be valid if password is not provided", async () => {
    const userWithoutPassword = new UpdateUserDto();
    userWithoutPassword.fullName = "John Doe";

    const errors = await validate(userWithoutPassword);

    expect(errors.length).toBe(0);
  });

  /**
   * Test to ensure validation passes if the full name is not provided (optional).
   */
  it("should be valid if fullName is not provided", async () => {
    const userWithoutFullName = new UpdateUserDto();
    userWithoutFullName.password = "Password123";

    const errors = await validate(userWithoutFullName);

    expect(errors.length).toBe(0);
  });

  /**
   * Test to ensure validation fails if fullName is an empty string.
   */
  it("should be invalid if fullName is an empty string", async () => {
    const emptyFullNameUser = new UpdateUserDto();
    emptyFullNameUser.password = "Password123";
    emptyFullNameUser.fullName = "";

    const errors = await validate(emptyFullNameUser);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("fullName");
  });
});
