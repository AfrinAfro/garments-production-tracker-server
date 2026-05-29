const { ObjectId } = require("mongodb");

const client = require("../config/db");

const usersCollection = client
  .db("garmentsDB")
  .collection("users");


  //  GET ALL USERS


const getAllUsers = async (req, res) => {
  try {
    const users = await usersCollection
      .find()
      .toArray();

    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


  //  UPDATE USER ROLE


const updateUserRole = async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;

    const result =
      await usersCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            role,
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


  //  DELETE USER


const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const result =
      await usersCollection.deleteOne({
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
  getAllUsers,
  updateUserRole,
  deleteUser,
};