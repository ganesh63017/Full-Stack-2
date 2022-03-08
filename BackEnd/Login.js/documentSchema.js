const { mongoose } = require("mongoose");

const uploadSchema = mongoose.Schema(
  {
    clicks: { type: Array },
    naturalURL: { type: String },
    trackingURL: { type: String },
    message: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("documents", uploadSchema);
