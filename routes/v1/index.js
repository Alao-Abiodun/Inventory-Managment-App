const express = require("express");
const router = express.Router();

const inventoryRoute = require("./inventory.route");

router.use("/add", inventoryRoute);

module.exports = router;
