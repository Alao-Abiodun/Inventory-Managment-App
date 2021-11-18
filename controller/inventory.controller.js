const Inventory = require("../models/inventory.model");
const Error = require("../lib/error");
const Response = require("../lib/response");

exports.addInventory = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      throw Error("Please fill all the required field", "", 401);
    }
    const newInventory = new Inventory({
      name: name,
      price: price,
      quantity: quantity,
    });
    await newInventory.save();
    Response(res).success({ message: "Inventory created" }, 201);
  } catch (error) {
    Response(res).error(error, error.code);
  }
};

exports.fetchInventory = async (req, res) => {
  try {
    const allInventories = await Inventory.find({});
    Response(res).success({ allInventories }, 201);
  } catch (error) {
    Response(res).error(error, error.code);
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw Error("Id field is required", "", 401);
    }
    const inventoryExist = await Inventory.findById({ _id: id });
    if (!inventoryExist) {
      throw Error("Inventory ObjectId Not Found!", "", 401);
    }
    const changeInventory = await Inventory.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true, upsert: true }
    );
    Response(res).success({ changeInventory }, 200);
  } catch (error) {
    Response(res).error(error, error.code);
  }
};

exports.removeAnInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventoryExist = await Inventory.findById({ _id: id });
    if (!inventoryExist) {
      throw Error("Id Not Found!", "", 401);
    }
    const removeInventory = await Inventory.findOneAndDelete({ _id: id });
    Response(res).success(
      { message: "Inventory Deleted successfully", removeInventory },
      200
    );
  } catch (error) {
    Response(res).error(error, error.code);
  }
};
