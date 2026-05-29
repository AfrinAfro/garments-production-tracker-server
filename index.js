require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { MongoClient, ServerApiVersion } = require("mongodb");

const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const port = process.env.PORT || 5000;

//  MIDDLEWARES


app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(logger);


  //  ROUTES IMPORT


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const trackingRoutes = require("./routes/trackingRoutes");


  //  API ROUTES


app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/tracking", trackingRoutes);


  //  ROOT ROUTE


app.get("/", (req, res) => {
  res.send(
    "🚀 Garments Production Tracker Server Running"
  );
});


  //  MONGODB CONNECTION


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nrl0hct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();

    console.log(
      "✅ MongoDB Connected Successfully"
    );

    await client
      .db("admin")
      .command({ ping: 1 });

    console.log("✅ MongoDB Ping OK");
  } catch (error) {
    console.log(
      " MongoDB Connection Error:",
      error.message
    );
  }
}

connectDB();


  //  ERROR HANDLER


app.use(errorHandler);


  //  SERVER START


app.listen(port, () => {
  console.log(
    `🚀 Server running on port ${port}`
  );
});

module.exports = client;