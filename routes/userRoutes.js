const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.patch("/:id", updateUserRole);
router.delete("/:id", deleteUser);

module.exports = router;