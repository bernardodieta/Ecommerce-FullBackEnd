import passport from "passport";
import jwtStrategy from "passport-jwt";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; // Añadido
import { PRIVATE_KEY } from "../utils.js";
import userModel from "../services/dao/mongo/models/users.model.js"; // Asegúrate de importar tu modelo

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  passport.use("jwt", new JwtStrategy(
    {
      jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
      secretOrKey: PRIVATE_KEY,
    },
    async (jwt_payload, done) => {
      try {
        const user = await userModel.findById(jwt_payload.user._id);
        return done(null, user);
      } catch (error) {
        console.error("Error en JWT Strategy:", error);
        return done(error, null);
      }
    }
  ));

  passport.use("google", new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Buscar el usuario en la base de datos
        let user = await userModel.findOne({ googleId: profile.id });

        if (!user) {
          // Si el usuario no existe, lo creamos
          user = await userModel.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Error en Google Strategy:", error);
        return done(error, null);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializando el usuario:", error);
      done(error, null);
    }
  });
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwtCookieToken"];
  }
  return token;
};

export default initializePassport;
