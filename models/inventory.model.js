const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inventorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of inventory item"],
    },
    price: {
      type: String,
      required: [true, "Please enter the price of the item"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter the quantity you want for the item"],
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
