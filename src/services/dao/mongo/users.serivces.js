import userModel from "./models/users.model.js";
import {
  ConflictError,
  DatabaseError,
  NotFoundError,
} from "../../../utils/errors.js";

export default class UserServiceDao {
  constructor() {}

  userList = async (logger) => {
    const result = await userModel.find();
    if (!result) {
      logger.error(
        `Error al obtener la lista de usuarios. at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new NotFoundError("Error al obtener la lista de usuarios.");
    }
    return result;
  };
  deleteUserByEmail = async (email, logger) => {
    const result = await userModel.findOneAndDelete({ email: email });
    return result;
  };

  userById = async (_id, logger) => {
    try {
        console.log(_id);

        const result = await userModel.findById(_id)
            .populate('favProducts.productId') // Poblamos el campo productId
            .exec();

        if (!result) {
            logger.warning(
                `No se encontró un usuario con ese ID - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
            );
            throw new NotFoundError("No se encontró un usuario con ese ID");
        }

        return result;
    } catch (error) {
        logger.error(`Error al obtener el usuario: ${error.message}`);
        throw error; // Propaga el error para que pueda ser manejado por el controlador
    }
};

  updateInfo = async (userId, userUpdate, logger) => {
    //console.log(userUpdate,'service');
    const options = { new: true };
    const result = await userModel.findByIdAndUpdate(
      userId,
      userUpdate,
      options
    );

    if (!result) {
      throw new DatabaseError("Error al actualizar la información del usuario");
    }
    return result;
  };

  updateInfoDocuments = async (userId, userUpdate, logger) => {
    const options = { new: true };
    const result = await userModel.findByIdAndUpdate(
      userId,
      { $push: { documents: { $each: userUpdate.documents } } },
      options
    );

    if (!result) {
      throw new DatabaseError("Error al actualizar la información del usuario");
    }
    return result;
  };

  userSave = async (user, logger) => {
    const result = await userModel.create(user);
    if (!result) {
      logger.error(
        `Error al guardar el usuario' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new DatabaseError("Error al guardar el usuario");
    }
    return result;
  };

  userByEmail = async (email, logger) => {
    const result = await userModel.findOne({ email });
    return result;
  };
}
