const express = require("express");
const router = express.Router();

const {
  signUp,
  signIn,
  updateUser,
  removeUser,
  fetchUsers,
} = require("../../controller/user.controller");

router.post("/create", signUp);
router.post("/login", signIn);
router.get("/fetch", fetchUsers);
router.patch("/update/:id", updateUser);
router.delete("/remove/:id", removeUser);

module.exports = router;
