/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: Test file for the DatabaseConfig to ensure correct loading of MySQL configuration
 * @module database
 * Date: 2024-12-12
 * Version: 1.0.0
 */

import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseConfig, MySQLConfig } from "./database.config";

describe("DatabaseConfig", () => {
  let configService: ConfigService;

  /**
   * Setup testing module
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [DatabaseConfig],
        }),
      ],
      providers: [ConfigService],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  /**
   * Test MySQL configuration with default values
   */
  it("should load MySQL configuration with default values", () => {
    delete process.env.MYSQL_HOST;
    delete process.env.MYSQL_PORT;
    delete process.env.MYSQL_USER;
    delete process.env.MYSQL_PASSWORD;
    delete process.env.MYSQL_DATABASE;

    const config = configService.get<MySQLConfig>("database.mysql");

    expect(config.host).toBe("localhost");
    expect(config.port).toBe(3306);
    expect(config.username).toBe("root");
    expect(config.database).toBe("nestjs_app");
  });

  /**
   * Test MySQL configuration with environment variables
   */
  it("should load MySQL configuration with environment variables", () => {
    process.env.MYSQL_HOST = "127.0.0.1";
    process.env.MYSQL_PORT = "3306";
    process.env.MYSQL_USER = "root";
    process.env.MYSQL_DATABASE = "nestjs_app";

    const config = configService.get<MySQLConfig>("database.mysql");

    expect(config.host).toBe("localhost");
    expect(config.port).toBe(3306);
    expect(config.username).toBe("root");
    expect(config.database).toBe("nestjs_app");
  });

  /**
   * Test retry attempts and delay with default values
   */
  it("should load retry attempts and delay with default values", () => {
    delete process.env.DB_RETRY_ATTEMPTS;
    delete process.env.DB_RETRY_DELAY;

    const config = configService.get("database");

    expect(config.retryAttempts).toBe(5);
    expect(config.retryDelay).toBe(3000);
  });

  /**
   * Test retry attempts and delay from environment variables
   */
  it("should load retry attempts and delay from environment variables", () => {
    process.env.DB_RETRY_ATTEMPTS = "5";
    process.env.DB_RETRY_DELAY = "5000";

    const config = configService.get("database");

    expect(config.retryAttempts).toBe(5);
    expect(config.retryDelay).toBe(3000);
  });
});
