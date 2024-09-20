import { notificationModel } from "./models/notification.models.js";

export default class NotificationService {
  constructor() {}

  getNotiById = async (userId) => {
    try {
      console.log("userId desde servicio", userId);

      const result = await notificationModel.find({ userId: userId });
      console.log(result);

      return result;
    } catch (error) {
      console.log("error al obtener las notificaciones");
    }
  };

  createNoti = async (notification) => {
    try {
      const result = await notificationModel.create(notification);
    } catch (error) {
      console.log("error al crear la notificacion");
    }
  };

  readNoti = (userId) => {
    return this.dao.readNoti(userId);
  };
}
