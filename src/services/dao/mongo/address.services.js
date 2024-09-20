import { loggers } from "winston";
import { DatabaseError } from "../../../utils/errors.js";
import addressModel from "./models/address.models.js";
import mongoose from "mongoose";

export default class AddressServicesDao {
  constructor() {}
  getFullAddress = async (userId, logger) => {
    const result = await addressModel.find({ userId: userId });
    if (!result) {
      logger.error(
        `Error al intentar obtener todas las direcciones.' - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new DatabaseError(
        "Error al intentar obtener todas las direcciones."
      );
    }
    return result;
  };

  getByIdAddress = async (addressId, logger) => {
    const result = await addressModel.findById(addressId);
    return result;
  };

  saveAddress = async (addressData, logger) => {
    const result = await addressModel.create(addressData);
    if (!result) {
      logger.error(
        `Error al guardar la direccion.' - ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new DatabaseError("Error al guardar la direccion.");
    }
    return result;
  };

  delAddresById = async (addressId, logger) => {
    try {
      const result = await addressModel.findByIdAndDelete(addressId);
      if (!result) {
        logger.error(
          `Error al eliminar la direccion.' - ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
        );
        throw new DatabaseError("Error al eliminar la direccion.");
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  updateAddress = async (addresId, addressUpdate, logger) => {
    const options = { new: true };
    //console.log(addresId);
    // console.log(addressUpdate);
    if (!mongoose.Types.ObjectId.isValid(addresId)) {
      logger.error(`Invalid address ID: ${addresId}`);
      throw new DatabaseError("Invalid address ID.");
    }
    const result = await addressModel.findByIdAndUpdate(
      { _id: addresId },
      addressUpdate,
      options
    );
    if (!result) {
      logger.error(
        `Ocurrió un error al intentar actualizar la dirección. - ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
      );
      throw new DatabaseError(
        "Ocurrió un error al intentar actualizar la dirección."
      );
    }

    return result;
  };
}
