import { DataSource } from "typeorm";

import { User } from "./src/module/User/entities/user.entity";
import { Fav } from "./src/module/ApiRM/entities/fav.entity";

import "dotenv/config";
// entities: ["dist/src/module/**/entities/*.entity.js"],

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: +process.env.PGPORT!,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  logging: false,
  synchronize: false,
  name: "default",
  entities: [User, Fav],
  migrationsTableName: "migrations",
  migrations: ["dist/src/database/migrations/*.js"],
  subscribers: ["dist/src/subscriber/*.js"]
});
