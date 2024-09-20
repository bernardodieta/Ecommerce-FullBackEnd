import mongoose from "mongoose";

const notificationCollection = "notifications";

const notificationsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  type: { type: String, require: true },

  message: {
    type: String,
    require: true,
  },
  read: { type: Boolean, require: false },
  createAt: { type: Date, default: Date.now },
});

export const notificationModel = mongoose.model(
  notificationCollection,
  notificationsSchema
);
