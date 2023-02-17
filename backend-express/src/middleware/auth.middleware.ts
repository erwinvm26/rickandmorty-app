import passport from "passport";
import strategy from "passport-local";

const localStrategy = strategy.Strategy;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        console.log({ email, password });

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
