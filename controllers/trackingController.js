const { ObjectId } = require("mongodb");

const client = require("../config/db");

const ordersCollection = client
  .db("garmentsDB")
  .collection("orders");


//    GET TRACKING INFO


const getTrackingInfo = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await ordersCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!order) {
      return res.status(404).send({
        message: "Order not found",
      });
    }

    res.send(order.trackingHistory || []);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


//    ADD TRACKING UPDATE


const addTrackingUpdate = async (
  req,
  res
) => {
  try {
    const id = req.params.id;

    const { status, note } = req.body;

    const trackingUpdate = {
      status,
      note,
      date: new Date(),
    };

    const result =
      await ordersCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $push: {
            trackingHistory: trackingUpdate,
          },
          $set: {
            status,
          },
        }
      );

    res.send({
      message:
        "Tracking updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  getTrackingInfo,
  addTrackingUpdate,
};