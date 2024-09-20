import mongoose from "mongoose";

const categoryCollection = "categorias";

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const categoryModel = mongoose.model(categoryCollection, categorySchema);
