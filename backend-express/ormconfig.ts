import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "secret",
  database: "postgres",
  logging: false,
  synchronize: true,
  name: "default",
  entities: ["src/module/**/entities/*.entity{.ts,.js}"],
  migrationsTableName: "migrations",
  migrations: ["dist/src/database/migrations/*{.ts,.js}"],
  subscribers: ["dist/src/subscriber/*{.ts,.js}"]
});
