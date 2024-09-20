import { response } from "../utils/response.js";
import { notificationService } from "../services/services.js";

export const getAllNotiByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('me llego',userId);
        
        if (!userId) {
          console.log("No hay un usuario con ese id");
        }
        const getNoti = await notificationService.getNotiById(userId);
        response(res, 200, getNoti);
    } catch (error) {
        console.log(error);
        
    }

};

export const createNotification = async (req, res) => {
  const { userId, type, message } = req.body;

  const creatNoti = await notificationService.createNoti({
    userId,
    type,
    message,
  });
  response(res, 200, creatNoti);
};
