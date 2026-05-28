const Order = require("../models/Order");

// CREATE ORDER (BUYER)
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      trackingHistory: [
        {
          status: "pending",
          note: "Order placed",
        },
      ],
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ORDERS (ADMIN/MANAGER)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER ORDERS (BUYER)
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerEmail: req.params.email })
      .populate("productId");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ORDER STATUS (MANAGER)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;

    const order = await Order.findById(req.params.id);

    order.status = status;
    order.trackingHistory.push({
      status,
      note,
    });

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ORDER (ADMIN)
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};