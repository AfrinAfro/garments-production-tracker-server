const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/ordersController");

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/user/:email", getUserOrders);
router.put("/:id", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;