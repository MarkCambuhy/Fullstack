import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import https from "https";
import fs from "fs";
import cookieParser from "cookie-parser";
import database from "./config/database.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postsRoute.js";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const credentials = {
  key: fs.readFileSync("src/SSL/code.key"),
  cert: fs.readFileSync("src/SSL/code.crt"),
};

const httpsServer = https.createServer(credentials, app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

database();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(limiter);

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/posts", postRoute);

httpsServer.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
