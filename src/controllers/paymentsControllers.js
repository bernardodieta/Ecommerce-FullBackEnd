import { NotFoundError } from "../utils/errors.js";
import { response } from "../utils/response.js";
import PaymentService from "../services/payment.js";
import { ordersService } from "../services/services.js";
import { purchase } from "../controllers/carts.controllers.js";

export const paymentIntentControllers = async (req, res, next) => {
  try {
    const orderId = req.query.id;
    const getOrder = await ordersService.getOrderById(orderId);

    if (!getOrder)
      throw new NotFoundError("No se encontró una orden con ese ID.");

    const paymentIntentInfo = {
      amount: getOrder.total,
      currency: "usd",
      metadata: {
        userId: getOrder.email,
        order: JSON.stringify(getOrder._id),
      },
    };

    const service = new PaymentService();
    let result = await service.createPaymentIntent(paymentIntentInfo);

    response(res, 200, { status: "success", payload: result });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      error: "Ocurrió un error con el proveedor externo.",
    });
  }
};

export const paymentConfirmationControllers = async (req, res, next) => {
  console.log("Llego a confirmation");
  const orderId = req.query.id;
  const paymentIntent = req.body.paymentIntent;
  console.log("PaymentIntent BACK", paymentIntent);

  const getOrder = await ordersService.getOrderById(orderId);
  console.log("getOrder", getOrder);

  if (paymentIntent.status === "succeeded") {
    // Actualizar el estado de la orden a "Completado"
    getOrder.paymentProcess = {
      status: "Completado",
      updatedAt: new Date(),
      method: paymentIntent.method || "Tarjeta", // Aquí puedes obtener el método de pago si está disponible en paymentIntent
    };
    //REVISAR NO ACTUALIZA ORDEN
    const update = await ordersService.updateOrderStatus(orderId, getOrder);
    purchase(orderId, req, res, next);
    console.log("update", update);
  } else {
    console.log("paymentIntent ERROR", paymentIntent);
  }
  response(res, 200, { status: "Pago Confirmado", getOrder });
};
