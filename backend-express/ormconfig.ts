import { DataSource } from "typeorm";

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
  entities: ["dist/src/module/**/entities/*.entity.js"],
  migrationsTableName: "migrations",
  migrations: ["dist/src/database/migrations/*.js"],
  subscribers: ["dist/src/subscriber/*.js"]
});
