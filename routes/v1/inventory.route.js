const express = require("express");
const router = express.Router();

const {
  addInventory,
  fetchInventory,
  updateInventory,
  removeAnInventory,
} = require("../../controller/inventory.controller");

const {
  validateUserToken,
  validateAdmin,
} = require("../../middleware/validation");

router.post("/add", validateUserToken, validateAdmin, addInventory);
router.get("/fetch", validateUserToken, fetchInventory);
router.patch("/update/:id", validateUserToken, validateAdmin, updateInventory);
router.delete(
  "/remove/:id",
  validateUserToken,
  validateAdmin,
  removeAnInventory
);

module.exports = router;
