import CustomRouter from "./customs.routes.js";
import { getOrderByIdController, getAllOrderByuserId, confirmOrder, cancelOrder, getAllOrder, updateAddressOrder } from "../controllers/orders.controllers.js";
export class OrdersRoutes extends CustomRouter {
    init() {
        this.get('/:userId', ['USER', 'PREMIUM', 'ADMIN'], getAllOrderByuserId)

        this.post('/confirm/:orderId', ['USER', 'PREMIUM', 'ADMIN'], confirmOrder)

        this.post('/cancel/:orderId', ['USER', 'PREMIUM', 'ADMIN'], cancelOrder)

        this.get('/orders', ['USER', 'PREMIUM', 'ADMIN'], getAllOrder)

        this.post('/:id', ['USER', 'PREMIUM', 'ADMIN'], updateAddressOrder)


    }
}

