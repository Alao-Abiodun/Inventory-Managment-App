const { model, Schema } = require("mongoose");

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
      type: String,
      required: [true, "Please enter the quantity you want for the item"],
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = model("Inventory", inventorySchema);

module.export = Inventory;
