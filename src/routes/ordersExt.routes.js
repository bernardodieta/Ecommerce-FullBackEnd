import CustomRouter from "./customs.routes.js";
import {
  getAllOrderByuserId,
  confirmOrder,
  cancelOrder,
  getAllOrder,
  updateAddressOrder,
  updateDeliveryStatus,
  deleteOrder,
} from "../controllers/orders.controllers.js";
export class OrdersRoutes extends CustomRouter {
  init() {
    this.get("/orders", ["USER", "PREMIUM", "ADMIN"], getAllOrder);

    this.get("/:userId", ["USER", "PREMIUM", "ADMIN"], getAllOrderByuserId);

    this.post("/confirm/:orderId", ["USER", "PREMIUM", "ADMIN"], confirmOrder);

    this.post("/cancel/:orderId", ["USER", "PREMIUM", "ADMIN"], cancelOrder);

    this.post("/:id", ["USER", "PREMIUM", "ADMIN"], updateAddressOrder);

    this.put(
      "/delivery-status/:orderId",
      ["USER", "PREMIUM", "ADMIN"],
      updateDeliveryStatus
    );

    this.delete("/delete/:orderId", ["ADMIN"], deleteOrder);
  }
}
