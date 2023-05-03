const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");

mongoose
  .connect(
    "mongodb+srv://opala:ai7yR02NvxGtD4BH@cluster0.fail8wy.mongodb.net/project?retryWrites=true&w=majority"
  ) // Colocar em .env?
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(5000, () => {
  console.log("Backend server is running!");
});
