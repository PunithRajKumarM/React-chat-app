import {
  getMessage,
  googleLogin,
  sendMessage,
} from "./src/controllers/controllers";
import { AppDataSource } from "./src/data-source";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const PORT = 4000;
require("dotenv").config();

app.use(cors());
const server = http.createServer(app);
app.use(express.json());
app.use(bodyParser.json());

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected (server): ${socket.id}`);

  socket.on("chat", async (payload) => {
    // console.log("Payload", payload);
    io.emit("receive-message", payload);
    await sendMessage(payload);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!!!");
    server.listen(PORT, () => {
      console.log("SERVER RUNNING IN THE PORT", PORT);
    });
  } catch (error) {
    console.log("Failed to connect the database!!!", error);
  }
})();

app.get("/getMessages", getMessage);
// app.post("/sendMessage", sendMessage);
app.post("/googleLogin", googleLogin);
