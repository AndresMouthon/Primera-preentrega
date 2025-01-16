import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { usersModelo } from "../dao/models/userModel.js";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"), 
      secretOrKey: "secret",
    },
    async (jwt_payload, done) => {
      try {
        const user = await usersModelo.findOne({ email: jwt_payload.email });

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModelo.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
