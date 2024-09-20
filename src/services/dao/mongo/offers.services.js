import { offerModel } from "./models/offersModel";

export default class OfferService {
  constructor() {}

  getAllOffer = async () => {
    try {
      const result = await offerModel.find();
      if (result) {
        return result;
      }
      console.log("no se encontro ningun resultado");
    } catch (error) {
      console.log("error al obtener las ofertas");
    }
  };

  saveOffer = (offer) => {
    
  };

  getOfferById = () => {};

  updateOffer = () => {};

  deleteOffer = () => {};
}
