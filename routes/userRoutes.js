const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET ALL USERS
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// UPDATE ROLE
router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// GET ROLE BY EMAIL
router.get("/role/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.json({ role: user?.role || "buyer" });
});

module.exports = router;