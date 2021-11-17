const express = require("express");
const router = express.Router();

const { addInventory } = require("../../controller/inventory.controller");

router.post("/inventory", addInventory);

module.exports = router;
