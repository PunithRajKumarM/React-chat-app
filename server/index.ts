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
const PORT = 4000;

require("dotenv").config();
app.use(
  cors({
    origin: "*",
    methods: ["GET,POST,PUT,PATCH,DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!!!");
    app.listen(PORT, () => {
      console.log("Server is listening on port ", PORT);
    });
  } catch (error) {
    console.log("Failed to connect the database!!!", error);
  }
})();

app.get("/", getMessage);
app.post("/sendMessage", sendMessage);
app.post("/googleLogin", googleLogin);
