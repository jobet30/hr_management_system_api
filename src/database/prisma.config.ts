import { PrismaClient } from "@prisma/client";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

/**
 * PrismaService class to manage PrismaClient lifecycle within the NestJS application.
 * Handles connection and disconnection to the database.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Constructor to initialize PrismaClient with custom datasource configuration.
   * @param {ConfigService} configService - NestJS ConfigService instance for accessing environment variables.
   */
  constructor(private readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>("DATABASE_URL"),
        },
      },
    });
  }

  /**
   * Called when the module is initialized.
   * Establishes a connection to the database.
   * @returns {Promise<void>}
   */
  async onModuleInit() {
    await this.$connect();
    console.log("Connected to the database");
  }

  /**
   * Called when the module is destroyed.
   * Disconnects from the database.
   * @returns {Promise<void>}
   */
  async onModuleDestroy() {
    await this.$disconnect();
    console.log("Disconnected from the database");
  }
}
