const { ObjectId } = require("mongodb");

const client = require("../config/db");

const ordersCollection = client
  .db("garmentsDB")
  .collection("orders");


  //  CREATE ORDER


const createOrder = async (req, res) => {
  try {
    const order = {
      ...req.body,
      status: "pending",
      trackingHistory: [
        {
          status: "pending",
          note: "Order placed",
          date: new Date(),
        },
      ],
      createdAt: new Date(),
    };

    const result =
      await ordersCollection.insertOne(order);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


  //  GET ALL ORDERS


const getAllOrders = async (req, res) => {
  try {
    const orders = await ordersCollection
      .find()
      .toArray();

    res.send(orders);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


  //  GET USER ORDERS


const getUserOrders = async (req, res) => {
  try {
    const email = req.params.email;

    const orders = await ordersCollection
      .find({
        buyerEmail: email,
      })
      .toArray();

    res.send(orders);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


  //  UPDATE ORDER STATUS


const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const id = req.params.id;

    const { status, note } = req.body;

    const result =
      await ordersCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            status,
          },
          $push: {
            trackingHistory: {
              status,
              note,
              date: new Date(),
            },
          },
        }
      );

    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


  //  DELETE ORDER


const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const result =
      await ordersCollection.deleteOne({
        _id: new ObjectId(id),
      });

    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
};