import { Router } from "express";
import { IDinamycImports } from "./routes.interface";

import authRoutes from "../module/Auth/auth.routes";

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
        modules: authRoutes
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
