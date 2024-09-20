import CustomRouter from "./customs.routes.js";
import {
  getAllNotiByUserId,
  createNotification,
} from "../controllers/notification.controllers.js";

export  class NotificationRouter extends CustomRouter {
  init() {
    this.get("/:userId", ['PUBLIC'], getAllNotiByUserId);

    this.post("/create", ["PUBLIC"], createNotification);
  }
}
