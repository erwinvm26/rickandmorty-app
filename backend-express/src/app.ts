import express, { Express } from "express";
import { router } from "./routes";

import config from "./config";

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
  }
}

export const { app, port } = new App();
