import { Router, Request, Response, NextFunction } from "express";

import { ApiController } from "./api.controller";
import { verifyToken } from "./../Auth/auth.middleware";

const router = Router();
const api = new ApiController();

router.get("/", verifyToken, api.getAll);

router.post("/addfav", verifyToken, api.addFav);

export default router;
