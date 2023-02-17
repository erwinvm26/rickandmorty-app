import express, { Express } from "express";
import { router } from "./routes";
import { routesExternal } from "./module/ApiRM/index.routes";

import config from "./config";

import "./module/Auth/auth.middleware";

import { AppDataSource } from "../ormconfig";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

class App {
  app: Express;
  port: number;

  constructor() {
    this.app = express();
    this.port = config.port;

    this.middleware();
    this.routes();
  }

  private middleware() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/api", router);
    this.app.use("/rickmorty", routesExternal);
  }
}

export const { app, port } = new App();
