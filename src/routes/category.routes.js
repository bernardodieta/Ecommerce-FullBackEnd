import {
  getAllCat,
  saveCat,
  editCat,
  deleteCat
} from "../controllers/category.controllers.js";
import CustomRouter from "./customs.routes.js";

export class CategoryRoutes extends CustomRouter {
  init() {
    this.get("/", ["PUBLIC"], getAllCat);

    this.post("/create", ["PUBLIC"], saveCat);

    this.put("/edit/:id", ["PUBLIC"], editCat);

    this.delete("/delete/:id", ["PUBLIC"], deleteCat);
  }
}
