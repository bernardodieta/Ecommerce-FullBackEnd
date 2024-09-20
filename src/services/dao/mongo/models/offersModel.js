import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  discountPercentage: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  active: { type: Boolean, default: false },
});

offerSchema.methods.updateActiveStatus = function () {
  const now = new Date();
  this.active = now >= this.startDate && now <= this.endDate;
  return this.active;
};

export const offerModel = mongoose.model("Offer", offerSchema);
