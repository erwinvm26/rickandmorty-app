import { Request, Response, NextFunction } from "express";
import passport from "passport";
import strategy from "passport-local";
import { z } from "zod";
import { BadRequest } from "http-errors";

import { loginValidated } from "./auth.validate";
import { User } from "../User/entities/user.entity";
import { UserService } from "../User/user.service";
import { UserCreate } from "../User/interface/user.interface";

const localStrategy = strategy.Strategy;

passport.use(
  "register",
  new localStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password"
    },
    async (req: Request<{}, {}, UserCreate>, email, password, done) => {
      const { name } = req.body;
      try {
        const user = new UserService().create({ name, email, password });

        return done(null, user, { message: "Registered Successfully" });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = new UserService().firstOne(email);

        return done(null, {}, { message: "Logged Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!loginValidated.parse(req)) {
      throw new BadRequest();
    }

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error.issues;
    }
  }
}
