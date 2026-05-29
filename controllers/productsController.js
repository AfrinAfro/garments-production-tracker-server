const { ObjectId } = require("mongodb");

const client = require("../config/db");

const productsCollection = client
  .db("garmentsDB")
  .collection("products");


  //  CREATE PRODUCT


const createProduct = async (req, res) => {
  try {
    const product = {
      ...req.body,
      createdAt: new Date(),
    };

    const result =
      await productsCollection.insertOne(product);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


  //  GET ALL PRODUCTS


const getAllProducts = async (req, res) => {
  try {
    const products = await productsCollection
      .find()
      .toArray();

    res.send(products);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


  //  GET SINGLE PRODUCT


const getSingleProduct = async (
  req,
  res
) => {
  try {
    const id = req.params.id;

    const product =
      await productsCollection.findOne({
        _id: new ObjectId(id),
      });

    res.send(product);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


  //  UPDATE PRODUCT


const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const result =
      await productsCollection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: req.body,
        }
      );

    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};


  //  DELETE PRODUCT


const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const result =
      await productsCollection.deleteOne({
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
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};