import CustomRouter from "./customs.routes.js";
import { paymentIntentControllers } from "../controllers/paymentsControllers.js";


export class PaymentRoutes extends CustomRouter {
    init() {
        this.post('/payment-intents', ['USER', 'PREMIUM', 'ADMIN'], paymentIntentControllers)

        this.post('/checkout', ['USER', 'PREMIUM', 'ADMIN'], console.log('llego'))
    }
}