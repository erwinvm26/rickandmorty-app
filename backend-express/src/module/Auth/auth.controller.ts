import { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { BadRequest } from "http-errors";
import { LoginValidated, LoginPostInput } from "./auth.validate";

import { z } from "zod";

const router = Router();

router.post(
  "/register",
  (req: Request<{}, {}, LoginPostInput>, res: Response, next: NextFunction) => {
    try {
      if (LoginValidated.parse(req)) {
        next();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
      }
    }
  },
  passport.authenticate("register", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      message: "Signup successful",
      user: req.user
    });
  }
);

router.post(
  "/login",
  (req: Request<{}, {}, LoginPostInput>, res: Response, next: NextFunction) => {
    try {
      if (LoginValidated.parse(req)) {
        next();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
      }
    }
  },
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("login", async (err: any, user: any, info: any) => {
      try {
        if (err || !user) throw new BadRequest();

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, "TOP_SECRET");

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
);

export default router;
