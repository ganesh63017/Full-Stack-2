const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema(
  {
    name: { type: String, required: true, min: 3, max: 50 },
    email: { type: String, required: true, min: 3, max: 50 },
    phone: { type: String, required: true, min: 3, max: 50 },
    gender: { type: String, required: true, min: 3, max: 50 },
    password: { type: String, required: true, min: 3, max: 50 },
    profilePicture: { type: String },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("dbesing", LoginSchema);
