import { categoryService } from "../services/services.js";
import { response } from "../utils/response.js";
import { catchedAsync } from "../utils/catchedAsync.js";

const saveCat = async (req, res, next) => {
  const { category } = req.body;
  const result = await categoryService.saveCategory(category);
  response(res, 202, result);
};

const getAllCat = async (req, res, next) => {
  const result = await categoryService.getAllCategory();
  response(res, 200, result);
};

const editCat = async (req, res, next) => {
  const { id } = req.params;
  const { category } = req.body;
  console.log(id, category);

  const result = await categoryService.updateCategory(id, category);
  response(res, 200, result);
};

const deleteCat = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await categoryService.deleteCategory(id);
    if (result) {
      response(res, 200, { message: "Categoria borrada", result });
    } else {
      response(res, 404, { message: "Categoria no encontrada" });
    }
  } catch (error) {
    next(error);
  }
};

const TuningdeleteCat = catchedAsync(deleteCat);
const TuningeditCat = catchedAsync(editCat);
const TuninggetAllCatt = catchedAsync(getAllCat);
const TuningsaveCat = catchedAsync(saveCat);

export {
  TuningdeleteCat as deleteCat,
  TuningeditCat as editCat,
  TuninggetAllCatt as getAllCat,
  TuningsaveCat as saveCat,
};
