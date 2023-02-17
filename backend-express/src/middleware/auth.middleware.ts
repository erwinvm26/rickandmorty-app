import passport from "passport";
import strategy from "passport-local";

import { UserService } from "../module/User/user.service";

const localStrategy = strategy.Strategy;

passport.use(
  "register",
  new localStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
      passwordField: "password"
    },
    async (req, email, password, done) => {
      const { name } = req.body;
      try {
        console.log({ name, email, password });

        const user = new UserService().create({ name, email, password });

        console.log(user);

        // const user = await signup(email, password);

        return done(null, {});
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
        console.log({ email, password });

        return done(null, {}, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
