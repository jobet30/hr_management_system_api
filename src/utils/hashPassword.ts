/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: Utility function to hash a password using bcrypt.
 * @param password - The plain text password to be hashed.
 * @returns A promise that resolves to the hashed password.
 * @throws {Error} If an error occurs during the hashing process.
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import * as bcrypt from "bcrypt";

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param {string} password - The plain text password to be hashed.
 * @param {number} saltRounds - The number of salt rounds to use for hashing (default is 10).
 * @returns {Promise<string>} A promise that resolves with the hashed password.
 */
export const hashPassword = async (
  password: string,
  saltRounds: number = 10,
): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password: " + error.message);
  }
};

/**
 * Compares a plain text password with a hashed password.
 *
 * @param {string} password - The plain text password.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the passwords match, otherwise `false`.
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords: " + error.message);
  }
};
