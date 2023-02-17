import { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { BadRequest } from "http-errors";
import { LoginValidated, LoginPostInput } from "./auth.validate";

const router = Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
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
    if (LoginValidated.parse(req)) {
      next();
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
