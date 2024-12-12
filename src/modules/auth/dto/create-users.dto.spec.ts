/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: Test for CreateUserDto to ensure proper validation.
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import { CreateUserDto } from "./create-users.dto";
import { validate } from "class-validator";

/**
 * Test suite for CreateUserDto validation.
 */
describe("CreateUserDto", () => {
  /**
   * Test to ensure CreateUserDto is valid with correct data.
   */
  it("should be valid with correct data", async () => {
    const validUser = new CreateUserDto();
    validUser.email = "test@example.com";
    validUser.password = "Password123";
    validUser.fullName = "John Doe";

    const errors = await validate(validUser);

    expect(errors.length).toBe(0);
  });

  /**
   * Test to ensure validation fails if the email is incorrect.
   */
  it("should be invalid if email is incorrect", async () => {
    const invalidEmailUser = new CreateUserDto();
    invalidEmailUser.email = "invalid-email";
    invalidEmailUser.password = "Password123";
    invalidEmailUser.fullName = "John Doe";

    const errors = await validate(invalidEmailUser);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("email");
    expect(errors[0].constraints.isEmail).toBeDefined();
  });

  /**
   * Test to ensure validation fails if the password is too short.
   */
  it("should be invalid if password is too short", async () => {
    const shortPasswordUser = new CreateUserDto();
    shortPasswordUser.email = "test@example.com";
    shortPasswordUser.password = "short";
    shortPasswordUser.fullName = "John Doe";

    const errors = await validate(shortPasswordUser);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("password");
    expect(errors[0].constraints.minLength).toBeDefined();
  });

  /**
   * Test to ensure validation fails if the full name is missing.
   */
  it("should be invalid if fullName is missing", async () => {
    const missingFullNameUser = new CreateUserDto();
    missingFullNameUser.email = "test@example.com";
    missingFullNameUser.password = "Password123";

    const errors = await validate(missingFullNameUser);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("fullName");
  });

  /**
   * Test to ensure validation fails if the password is missing.
   */
  it("should be invalid if password is missing", async () => {
    const missingPasswordUser = new CreateUserDto();
    missingPasswordUser.email = "test@example.com";
    missingPasswordUser.fullName = "John Doe";

    const errors = await validate(missingPasswordUser);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("password");
  });
});
