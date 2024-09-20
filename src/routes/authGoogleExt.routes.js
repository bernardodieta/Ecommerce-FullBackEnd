import { generateJWToken } from "../utils.js";
import CustomRouter from "./customs.routes.js";
import passport from "passport";

export default class GoogleRoutes extends CustomRouter {
  init() {
    this.get(
      "/auth/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["profile", "email"] })
    );

    this.get(
      "/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/" }),
      (req, res) => {
        const token = generateJWToken(req.user); 
        res.cookie("jwtCookieToken", token, { httpOnly: true });
        res.redirect("/"); 
      }
    );

    this.get("/logout", (req, res) => {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.clearCookie("jwtCookieToken");
        res.redirect("/");
      });
    });

    // Ruta para obtener el usuario autenticado
    this.get(
      "/users/me",
      ['USER', 'PREMIUM', 'ADMIN'], // Aquí defines el acceso a la ruta, en este caso privado
      passport.authenticate("jwt", { session: false }),
      (req, res) => {
        // Devuelve la información del usuario autenticado
        res.status(200).json(req.user);
      }
    );
  }
}
