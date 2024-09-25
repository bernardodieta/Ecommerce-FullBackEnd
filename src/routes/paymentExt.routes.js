import CustomRouter from "./customs.routes.js";
import {
  paymentIntentControllers,
  paymentConfirmationControllers,
} from "../controllers/paymentsControllers.js";

export class PaymentRoutes extends CustomRouter {
  init() {
    this.post(
      "/payment-intents",
      ["USER", "PREMIUM", "ADMIN"],
      paymentIntentControllers
    );

    this.post(
      "/checkout",
      ["USER", "PREMIUM", "ADMIN"],
      paymentConfirmationControllers
    );
  }
}
