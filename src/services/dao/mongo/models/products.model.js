import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
};

const stringTypeSchemaNonUniqueRequired = {
  type: String,
  required: true,
};

const valorationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const offerSchema = new mongoose.Schema({
  discount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String }, // Agregado `required`
    description: { type: String }, // Agregado `required`

    stock: {
      type: Number,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    brand: { type: String }, // Agregado `required`
    model: { type: String }, // Agregado `required`
    color: { type: String }, // Eliminado duplicado
    gamer: { type: String },
  
    battery: { type: String },
    garantia: { type: String },
    botones: { type: String },
    iluminacion: { type: String },
    bluetooth: { type: String },
    recargable: { type: String },
    conector: { type: String },
    sistema: { type: String },
    resolution: { type: String },
    valorations: [valorationSchema],
    questions: {
      type: [mongoose.Schema.Types.ObjectId], // Cambiado a un array
      ref: "questionProducts",
    },
    fecharegistro: {
      type: Date,
      default: Date.now,
    },
    img: [],
    owner: {
      type: String,
    },
    offers: [offerSchema],
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);

