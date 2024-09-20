import { categoryModel } from "./models/category.models.js";

export default class CategoryServiceDao {
  constructor() {}

  getAllCategory = async () => {
    try {
      const result = await categoryModel.find();
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  saveCategory = async (category) => {
    try {
      const result = await categoryModel.create({ category });
      return result
    } catch (error) {
      console.log(error);
    }
  };

  updateCategory = async (id, category) => {
    try {
      const result = await categoryModel.findByIdAndUpdate(
        id,
        { category },
        { new: true } 
      );

      return result; 
    } catch (error) {
      console.log(error);
      throw error; 
    }
  };

  deleteCategory = async (id) => {
    try {
      const result = await categoryModel.findByIdAndDelete(id);

      return result; 
    } catch (error) {
      console.log(error);
      throw error; 
    }
  };
}
