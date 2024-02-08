import { AppDataSource } from "./src/data-source";
const express = require("express");
const app = express();
const PORT = 4000;
require("dotenv").config();

app.use(express.json());

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


