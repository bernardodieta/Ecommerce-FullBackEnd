import cron from "node-cron";
import { productModel } from "../services/dao/mongo/models/products.model.js";

const updateOffers = async () => {
  try {
    console.log("Verificando y actualizando ofertas de productos...");

    const now = new Date();
    const nowUTC = new Date(now.toISOString()); // Convertir a UTC si es necesario

    console.log("Fecha actual en UTC:", nowUTC.toISOString());
    console.log("Zona horaria del servidor:", Intl.DateTimeFormat().resolvedOptions().timeZone);

    const products = await productModel.find({ "offers.0": { $exists: true } });

    for (const product of products) {
      let updated = false;

      for (const offer of product.offers) {
        const startDate = new Date(offer.startDate);
        const endDate = new Date(offer.endDate);

        console.log("Fecha de inicio:", startDate.toISOString());
        console.log("Fecha de fin:", endDate.toISOString());

        if (startDate <= nowUTC && endDate >= nowUTC) {
          if (offer.isActive === false) {
            offer.isActive = true;
            updated = true;
            console.log(`Oferta activada: ${offer.discount}%`);
          }
        } else {
          if (offer.isActive) {
            offer.isActive = false;
            updated = true;
            console.log(`Oferta desactivada: ${offer.discount}%`);
          }
        }
      }

      if (updated) {
        await product.save();
        console.log(`Ofertas actualizadas para el producto: ${product.title}`);
      }
    }
  } catch (error) {
    console.error("Error al actualizar las ofertas de productos:", error);
  }
};

// Programar cron job para que se ejecute cada minuto (durante pruebas)
cron.schedule("* * * * *", updateOffers);

export default updateOffers;
