import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../../config";
import { UserService } from "../User/user.service";
import { request } from "http";

export default class AuthController {
  constructor() {}

  async register(req: Request, res: Response, next: NextFunction) {
    res.json({
      user: req.user
    });
  }

  async login(req: Request, res: Response, next: NextFunction) {
    res.json({
      user: req.user
    });
    // passport.authenticate("login", async (err: any, user: any, info: any) => {
    //   try {
    //     req.login(user, { session: false }, async (error) => {
    //       if (error) return next(error);
    //       const user = new UserService().firstOne(email);
    //       const body = { _id: user._id, email: user.email };
    //       const token = jwt.sign({ user: body }, config.secret_key);
    //       return res.json({ token });
    //     });
    //   } catch (error) {
    //     return next(error);
    //   }
    // })(req, res, next);
  }
}
