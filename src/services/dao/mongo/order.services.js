import { orderModel } from "./models/ticket.model.js";
import { productModel } from "./models/products.model.js";
import mongoose from "mongoose";

export default class OrderServicesDao {
  constructor() {}
  getOrders = async (next) => {
    try {
      const orders = await orderModel.find().populate("products.product");;
      console.log(orders);

      return orders;
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  saveOrder = async (orderData, logger, next) => {
    try {
      //console.log('Se creo la orden')
      const newOrder = await orderModel.create(orderData);
      //console.log('New order desde servicio', newOrder)
      return newOrder;
    } catch (error) {
      console.log(error);
      // new DatabaseError('Error al obtener la orden por ID')
      next(error);
    }
  };

  getOrdersByCustomerId = async (customerId, logger, next) => {
    try {
      const orders = await orderModel
        .find({ customer: customerId })
        .populate("products.product");
      return orders;
    } catch (error) {
      logger.error(
        `${req.method} en ${
          req.url
        } - Error:'Error al obtener la orden por ID' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      console.log(error);
      //throw new DatabaseError('Error al obtener la orden por ID')
      next(error);
    }
  };

  getAllOrderByuserId = async (userId, logger) => {
    try {
      const orders = await orderModel.find().populate("products.product");
      return orders;
    } catch (error) {
      console.log(error);
      logger.error(
        `${req.method} en ${
          req.url
        } - Error:'Error al obtener todas las ordenes de este usuario' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new DatabaseError(
        "Error al obtener todas las ordenes de este usuario"
      );
    }
  };

  getOrderById = async (orderId, logger) => {
    try {
      const order = await orderModel.findById(orderId);
      return order;
    } catch (error) {
      console.log(error);

      //throw new DatabaseError('Error al actualizar el estado de la orden.')
    }
  };

  updateOrderStatus = async (orderId, newStatus, logger) => {
    try {
      console.log("newStatus", newStatus);

      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: { "paymentProcess.status": newStatus.paymentProcess.status } },
        { new: true }
      );
      return updatedOrder;
    } catch (error) {
      console.log(error);
    }
  };
  updateOrderAddress = async (orderId, address, logger) => {
    try {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: { address: address } },
        { new: true }
      );
      return updatedOrder;
    } catch (error) {
      logger.error(
        `${req.method} en ${
          req.url
        } - Error:'Error al actualizar el estado de la orden.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new DatabaseError("Error al actualizar el estado de la orden.");
    }
  };
  updateOrderDeliveryStatus = async (orderId, newStatus, logger) => {
    try {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: { deliverystatus: newStatus } },
        { new: true }
      );
      return updatedOrder;
    } catch (error) {
      logger.error(
        `${req.method} en ${
          req.url
        } - Error: 'Error al actualizar el estado de entrega.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new DatabaseError("Error al actualizar el estado de entrega.");
    }
  };

  // Servicio para eliminar una orden
  deleteOrder = async (orderId, logger) => {
    try {
      const deletedOrder = await orderModel.findByIdAndDelete(orderId);
      return deletedOrder;
    } catch (error) {
      logger.error(
        `${req.method} en ${
          req.url
        } - Error: 'Error al eliminar la orden.' ${error} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new DatabaseError("Error al eliminar la orden.");
    }
  };
}
