const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: ["Electronic", "Automobile"],
  },
  brandName: {
    type: String,
    require: true,
  },
  details: {
    type: String,
    require: true,
  },
  contactNo: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: String,
    require: true,
  },
  productImage: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
