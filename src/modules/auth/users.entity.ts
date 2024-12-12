/* eslint-disable prettier/prettier */
/**
 * Author: Jobet Casquejo
 * Description: TypeORM entity for user data. Defines the structure of the users table in the database.
 * Date: 2024-12-12
 * Version: 1.0.0
 */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * User entity represents a user in the system.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;
}
