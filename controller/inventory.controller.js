const Inventory = require("../model/inventory.model");
const { Error } = require("../lib/error");
const { Response } = require("../lib/response");

exports.addInventory = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      throw Error("Please fill all the required field", "", 401);
    }
    const newInventory = new Inventory({ name, price, quantity });
    const data = await newInventory.save();
    Response(res).success({ data }, 201);
  } catch (error) {
    Response(res).error(err, err.code);
  }
};
