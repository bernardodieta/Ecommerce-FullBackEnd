import CustomRouter from "./customs.routes.js";
import {
  saveQuestionProduct,
  getAllUserQuestion,
} from "../controllers/questionsProducts.controllers.js";
import {
  validateDataProduct,
  validateEmptyProductRegister,
} from "../services/middlewares/validateDataProduct.js";
import {
  getListProducts,
  saveProductController,
  getProductById,
  toggleFavorite,
  updateProductById,
  deletProductById,
  valorationAdd,
  updateProductOffer,
  createProductOffer,
  getBulkProducts,
} from "../controllers/products.controllers.js";
import { upload } from "../utils.js";

export class ProductsExtRouter extends CustomRouter {
  init() {
    this.post("/bulk-products", ["PUBLIC"], getBulkProducts); // Ruta para obtener múltiples productos
    
    this.get("/", ["PUBLIC"], getListProducts);

    this.post(
      "/favoritos/:productId",
      ["USER", "PREMIUM", "ADMIN"],
      toggleFavorite
    );

    this.post(
      "/register",
      ["USER", "PREMIUM", "ADMIN"],
      upload.array("files", 10),
      saveProductController
    );

    this.get("/:id?", ["PUBLIC"], getProductById);

    this.put(
      "/edit/:productId",
      ["ADMIN", "USER", "PREMIUM"],
      upload.array("files", 10), // Permite subir hasta 10 imágenes
      updateProductById
    );

    this.delete("/:id?", ["PREMIUM", "ADMIN"], deletProductById);

    this.post(
      "/valoration/:productId",
      ["PREMIUM", "USER", "ADMIN"],
      valorationAdd
    );

    this.put("/offer", ["ADMIN", "PREMIUM"], updateProductOffer);

    this.post("/offert/create", ["ADMIN", "PREMIUM"], createProductOffer);
  }
}
