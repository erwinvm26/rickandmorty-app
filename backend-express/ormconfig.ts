import { DataSource } from "typeorm";

import { User } from "./src/module/User/entities/user.entity";
import { Fav } from "./src/module/ApiRM/entities/fav.entity";
// entities: ["dist/src/module/**/entities/*.entity.js"],

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "secret",
  database: "postgres",
  logging: false,
  synchronize: false,
  name: "default",
  entities: [User, Fav],
  migrationsTableName: "migrations",
  migrations: ["dist/src/database/migrations/*.js"],
  subscribers: ["dist/src/subscriber/*.js"]
});
