import { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
import { BadRequest } from "http-errors";
import { z } from "zod";

import { verifyUser } from "./auth.validate";
import { authMiddleware } from "./auth.middleware";

import AuthController from "./auth.controller";

const router = Router();
const { login, register } = new AuthController();

router.post(
  "/register",
  authMiddleware,
  passport.authenticate("register", { session: false }),
  register
);

router.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!verifyUser.parse(req)) {
        throw new BadRequest();
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.issues[0].message);
      }
    }
  },
  passport.authenticate("login", { session: false }),
  login
);

export default router;
