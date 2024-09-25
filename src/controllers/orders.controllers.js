import { ordersService } from "../services/services.js";
import { NotFoundError } from "../utils/errors.js";
import { response } from "../utils/response.js";
import { catchedAsync } from "../utils/catchedAsync.js";
import mongoose from "mongoose";

const getAllOrderByuserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new NotFoundError("ID de usuario no válido.");
    }
    const orders = await ordersService.getAllOrderByuserId(userId, req.logger);
    if (!orders) {
      req.logger.warning(
        `${req.method} en ${
          req.url
        } - Error: 'No se encontró una orden con ese ID.' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new NotFoundError("No se encontró una orden con ese ID.");
    }

    response(res, 200, orders);
  } catch (error) {
    next(error);
  }
};

const getOrderByIdController = async (req, res, next) => {
  const { id } = req.params;
  const result = await ordersService.getOrderById(id, req.logger);
  response(res, 200, result);
};

const getAllOrder = async (req, res, next) => {
  try {
    const result = await ordersService.getOrders();
    response(res, 200, result);
  } catch (error) {
    next(error);
  }
};

const confirmOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    let newStatus = "Entregada";
    const result = await ordersService.updateOrderStatus(
      orderId,
      newStatus,
      req.logger
    );
    if (!result) {
      req.logger.warning(
        `${req.method} en ${
          req.url
        } - Error: 'No existe una orden a confirmar' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new NotFoundError("No existe una orden a confirmar");
    }
    response(res, 200, { message: "Orden confirmada.", order: result });
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    let newStatus = "Cancelada";
    const result = await ordersService.updateOrderStatus(
      orderId,
      newStatus,
      req.logger
    );
    if (!result) {
      req.logger.warning(
        `${req.method} en ${
          req.url
        } - Error: 'No existe una orden para cancelar' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );

      throw new NotFoundError("No existe una orden para cancelar");
    }
    response(res, 200, { message: "Orden Cancelada.", order: result });
  } catch (error) {
    next(error);
  }
};

const updateAddressOrder = async (req, res, next) => {
  const { id } = req.params;
  const { selectedAddress } = req.body;

  const updateAddress = await ordersService.updateOrderAddress(
    id,
    selectedAddress,
    req.logger
  );

  response(res, 200, selectedAddress);
};

const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new NotFoundError("ID de la orden no válido.");
    }

    const updatedOrder = await ordersService.updateOrderDeliveryStatus(
      orderId,
      newStatus,
      req.logger
    );

    if (!updatedOrder) {
      req.logger.warning(
        `${req.method} en ${
          req.url
        } - Error: 'No existe una orden con ese ID.' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new NotFoundError("No existe una orden con ese ID.");
    }

    response(res, 200, {
      message: "Estado de entrega actualizado.",
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};


const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    // Verificar si el orderId es válido
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new NotFoundError("ID de la orden no válido.");
    }

    const deletedOrder = await ordersService.deleteOrder(orderId, req.logger);

    if (!deletedOrder) {
      req.logger.warning(
        `${req.method} en ${
          req.url
        } - Error: 'No existe una orden con ese ID.' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new NotFoundError("No existe una orden con ese ID.");
    }

    response(res, 200, { message: "Orden eliminada correctamente." });
  } catch (error) {
    next(error);
  }
};
const TuningupdateDeliveryStatus = catchedAsync(updateDeliveryStatus);
const TuningdeleteOrder = catchedAsync(deleteOrder);
const TuninggetAllOrderByuserId = catchedAsync(getAllOrderByuserId);
const TuninggetAllOrder = catchedAsync(getAllOrder);
const TuninggetOrderByIdController = catchedAsync(getOrderByIdController);
const TuningconfirmOrder = catchedAsync(confirmOrder);
const TuningcancelOrder = catchedAsync(cancelOrder);
const TuningupdateAddressOrder = catchedAsync(updateAddressOrder);

export {
  TuninggetAllOrderByuserId as getAllOrderByuserId,
  TuninggetOrderByIdController as getOrderByIdController,
  TuninggetAllOrder as getAllOrder,
  TuningconfirmOrder as confirmOrder,
  TuningcancelOrder as cancelOrder,
  TuningupdateAddressOrder as updateAddressOrder,
  TuningupdateDeliveryStatus as updateDeliveryStatus,
  TuningdeleteOrder as deleteOrder,
};
