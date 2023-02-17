import { Router } from "express";

import { ApiController } from "./api.controller";

const router = Router();
const api = new ApiController();

router.get("/", api.getAll);

export const routesExternal = router;
