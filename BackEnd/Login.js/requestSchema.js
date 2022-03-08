const mongoose = require("mongoose");

const requestSchema = mongoose.Schema({
  email: { type: String },
  fileId: { type: String },
  signers: [],
  title: { type: String },
  unsignedDocument: { type: String },
  userId: { type: String },
});

module.exports = mongoose.model("requestData", requestSchema);
