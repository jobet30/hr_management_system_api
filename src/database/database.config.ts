/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: This file contains the configuration for the MySQL database connection.
 * @module database
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import { registerAs } from "@nestjs/config";

/**
 * Configuration for the MySQL database connection.
 * @returns {object} Configuration object containing database connection details.
 */
export const DatabaseConfig = registerAs("database", () => ({
  /**
   * MySQL database host.
   * @type {string}
   */
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",

    /**
     * MySQL database port.
     * @type {number}
     */
    port: parseInt(process.env.MYSQL_PORT, 10) || 3306,

    /**
     * MySQL database username.
     * @type {string}
     */
    username: process.env.MYSQL_USER || "root",

    /**
     * MySQL database password.
     * @type {string}
     */
    password: process.env.MYSQL_PASSWORD || "",

    /**
     * MySQL database name.
     * @type {string}
     */
    database: process.env.MYSQL_DATABASE || "nestjs_app",
  },

  /**
   * Number of retry attempts for the database connection.
   * @type {number}
   */
  retryAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS, 10) || 5,

  /**
   * Delay in milliseconds between retry attempts for the database connection.
   * @type {number}
   */
  retryDelay: parseInt(process.env.DB_RETRY_DELAY, 10) || 3000,
}));

/**
 * Type definition for MySQL configuration.
 * @typedef {object} MySQLConfig
 * @property {string} host - MySQL database host.
 * @property {number} port - MySQL database port.
 * @property {string} username - MySQL database username.
 * @property {string} password - MySQL database password.
 * @property {string} database - MySQL database name.
 */
export type MySQLConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export default DatabaseConfig;
