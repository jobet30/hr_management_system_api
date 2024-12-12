/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: Test file for the User entity, ensuring that the entity is correctly defined with all necessary properties.
 * Date: 2024-12-12
 * Version: 1.0.0
 */

import { User } from "./users.entity";

/**
 * Test suite for User entity.
 * It verifies that the User entity is correctly defined with all required properties.
 */
describe("User Entity", () => {
  /**
   * Test to verify that we can assign and retrieve values for User entity properties.
   */
  it("should be able to assign and retrieve property values", () => {
    const user = new User();

    user.id = "123e4567-e89b-12d3-a456-426614174000";
    user.email = "test@example.com";
    user.password = "password123";
    user.fullName = "Test User";

    expect(user.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("password123");
    expect(user.fullName).toBe("Test User");
  });

  /**
   * Test to verify that the User entity properties are of the correct type.
   */
  it("should have properties of the correct type", () => {
    const user = new User();
    user.id = "123e4567-e89b-12d3-a456-426614174000";
    user.email = "test@example.com";
    user.password = "password123";
    user.fullName = "Test User";

    expect(typeof user.id).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(typeof user.password).toBe("string");
    expect(typeof user.fullName).toBe("string");
  });
});
