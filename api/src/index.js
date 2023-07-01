import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import https from "https";
import fs from "fs";
import cookieParser from "cookie-parser";
import database from "./config/database.js";

import registerRoute from "./routes/registerRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postsRoute.js";

import mongoSanitize from "express-mongo-sanitize";
import sanitizeInput from "./middlewares/saniteze.js";
import rateLimit from "express-rate-limit";

import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const credentials = {
  key: fs.readFileSync("src/SSL/code.key"),
  cert: fs.readFileSync("src/SSL/code.crt"),
};

const httpsServer = https.createServer(credentials, app);
const io = new Server(httpsServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

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
app.use(sanitizeInput);
app.use(limiter);

app.use("/signup", registerRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/posts", postRoute);

httpsServer.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
