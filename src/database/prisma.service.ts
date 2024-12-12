/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: This file contains the configuration for the Prisma Service
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

/**
 * PrismaService is a wrapper around the PrismaClient for handling database interactions.
 * It manages database connections and disconnections during module lifecycle events.
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  /**
   * Called when the module is initialized. It establishes a connection to the database.
   * Logs the connection status for debugging and tracking.
   *
   * @returns {Promise<void>} A promise that resolves when the database connection is established.
   */
  async onModuleInit(): Promise<void> {
    try {
      console.log("PrismaService is initializing...");
      await this.$connect();
      console.log("PrismaClient connected to the database");
    } catch (error) {
      console.error("Error connecting to the database", error);
      throw new Error("Failed to connect to the database");
    }
  }

  /**
   * Called when the module is destroyed. It disconnects PrismaClient from the database.
   * Logs the disconnection status for tracking.
   *
   * @returns {Promise<void>} A promise that resolves when the database connection is closed.
   */
  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      console.log("PrismaClient disconnected from the database");
    } catch (error) {
      console.error("Error disconnecting from the database", error);
    }
  }

  /**
   * A custom method to execute a query.
   * Example: Fetches a list of employees.
   *
   * @returns {Promise<any[]>} A promise that resolves with the list of employees.
   */
  async customQuery(): Promise<any[]> {
    try {
      const result = await this.employee.findMany();
      return result;
    } catch (error) {
      console.error("Custom query failed:", error);
      throw new Error("Custom query execution failed");
    }
  }
}
