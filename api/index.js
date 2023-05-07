const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");

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
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

app.listen(5000, () => {
  console.log("Backend server is running!");
});
