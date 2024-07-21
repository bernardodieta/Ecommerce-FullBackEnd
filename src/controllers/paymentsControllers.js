import { NotFoundError } from "../utils/errors.js"
import { response } from "../utils/response.js"
import PaymentService from "../services/payment.js";
import { ordersService } from "../services/services.js";
import { purchase } from "../controllers/carts.controllers.js";

export const paymentIntentControllers = async (req, res, next) => {
    try {
        const orderId = req.query.id
        //console.log(req.query.id, 'req.query.id');
        const getOrder = await ordersService.getOrderById(orderId)
        //console.log(getOrder, 'getOrder');
        // console.log('req user', req.user);
        if (!getOrder) throw new NotFoundError('No se encontro una orden con ese ID.')

        const paymentIntentInfo = {
            amount: getOrder.total,
            currency: 'usd',
            metadata: {
                userId: getOrder.email,
                order: JSON.stringify(getOrder.email)
            }
        }

        const service = new PaymentService()
        let result = await service.createPaymentIntent(paymentIntentInfo);
        //console.log("Resultado del intento de pago:");
        purchase(orderId, req, res, next)
        // console.log(result);
        response(res, 200, { status: "success", payload: result });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Ocurrio un error con el proveedor externo." });
    }
}