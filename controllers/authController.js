const bcrypt = require("bcryptjs");
const client = require("../config/db");
const generateToken = require("../utils/generateToken");

const usersCollection = client
  .db("garmentsDB")
  .collection("users");


  //  REGISTER USER


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await usersCollection.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "buyer",
      status: "active",
      createdAt: new Date(),
    };

    const result =
      await usersCollection.insertOne(newUser);

    const token = generateToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).json({
      message: "Registration successful",
      insertedId: result.insertedId,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


  //  LOGIN USER


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersCollection.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


  //  LOGOUT USER


const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};