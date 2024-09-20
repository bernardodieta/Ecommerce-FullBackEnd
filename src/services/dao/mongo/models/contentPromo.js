import mongoose, { Types } from "mongoose";

const contentCollection = "contentPromo";

const contentSchema = new mongoose.Schema(
  {
    headerContent: {
      headerImg: { Types: String, require: true },
      text: { Types: String, require: false },
    },
    promoOneContent: {
      promoImg: { Types: String, require: true },
      text: { Types: String, require: false },
    },
  },
  { timestamps: true }
);

export const contentModel = mongoose.model(contentCollection, contentSchema);
