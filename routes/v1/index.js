const express = require("express");
const router = express.Router();

const inventoryRoute = require("./inventory.route");
const userRoute = require("./user.route");

router.use("/inventory", inventoryRoute);
router.use("/user", userRoute);

module.exports = router;
