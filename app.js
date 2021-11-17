const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const inventoryRoute = require("./routes/index");

app.use(express.json());
app.use(morgan("combined"));

const { PORT, DB_USERNAME, DB_PASSWORD } = process.env || 2005;

const connectDB = require("./databases/db");
connectDB;

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.iij5r.mongodb.net/inventoryApp`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database Not Connected", error.message));

app.use("/", (req, res, next) => {
  res.send("The main application route");
});

app.use("/api", inventoryRoute);

app.listen(PORT, (req, res, next) => {
  console.log(`Application running on PORT ${PORT}`);
});

module.exports = app;
