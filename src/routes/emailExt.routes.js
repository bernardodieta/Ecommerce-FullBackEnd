import { sendEmailConfirmendpoint } from "../controllers/email.controllers.js";
import CustomRouter from "./customs.routes.js";

export class EmailsRoutes extends CustomRouter {
  init() {
    this.post("/sendEmail", ["PUBLIC"], sendEmailConfirmendpoint);
  }
}
