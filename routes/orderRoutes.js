const express = require("express");
const router = express.Router();

const orderController = require("../controllers/ordersController");

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/user/:email", orderController.getUserOrders);
router.patch("/:id", orderController.updateOrderStatus);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;