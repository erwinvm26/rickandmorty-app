import { Router } from "express";
import { IDinamycImports } from "./routes.interface";

import authController from "../module/Auth/auth.controller";

/**
 * Created a new class for the Routes Dinamycs
 */
class Routes {
  router: Router;

  constructor() {
    this.router = Router();

    this.main();
  }

  // here: imports the routes from the controllers
  async routerControllers(): Promise<IDinamycImports[]> {
    return [
      {
        modules: authController
      }
    ];
  }

  async main() {
    for (let route of await this.routerControllers()) {
      this.router.use(route.path || "/", route.modules);
    }
  }
}

// export router
export const router = new Routes().router;
