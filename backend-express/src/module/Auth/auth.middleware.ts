import { Request, Response, NextFunction } from "express";
import passport from "passport";
import strategy from "passport-local";
import { z } from "zod";
import { BadRequest } from "http-errors";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

import { loginValidated } from "./auth.validate";
import { User } from "../User/entities/user.entity";
import { UserService } from "../User/user.service";
import { UserCreate } from "../User/interface/user.interface";
import config from "../../config";

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
        const user = await new UserService().create({ name, email, password });

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
        const user = await new UserService().firstOne(email);

        if (user.error) {
          return done(null, {
            message: user.message
          });
        }

        if (user && (await compare(password, user.password))) {
          const token = jwt.sign({ user }, config.secret_key, {
            expiresIn: "24h"
          });

          return done(
            null,
            { user: { token } },
            { message: "Logged Successfully" }
          );
        }
        return done(null, { message: "Password is wrong!" });
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
      throw new Error(error.issues[0].message);
    }
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token =
    req.body.token || req.query.token || req.headers["autorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.secret_key);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
