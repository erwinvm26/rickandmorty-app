import express, { Express } from "express";
import cors from "cors";
import { router } from "./routes";

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
    this.app.use(cors());
  }

  private routes() {
    this.app.use("/api", router);
  }
}

export const { app, port } = new App();
