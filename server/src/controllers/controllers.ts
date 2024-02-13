require("dotenv").config();
import { AppDataSource } from "../data-source";
import { Message } from "../entity/Message";
import { Request, Response } from "express";
import { User } from "../entity/User";

const userRepo = AppDataSource.getRepository(User);
const messageRepo = AppDataSource.getRepository(Message);

export const googleLogin = async (req: Request, res: Response) => {
  try {
    let { email, name } = req.body;
    let existingUser = await userRepo.findOne({ where: { email } });
    if (!existingUser) {
      let newUser = new User();
      newUser.email = email;
      newUser.userName = name;
      await userRepo.save(newUser);
      console.log("Data saved");

      res
        .status(201)
        .json({ message: "New user created successfully", data: newUser });
    } else {
      res
        .status(200)
        .json({ message: "User already exist!!!", data: existingUser });
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (payload) => {
  console.log("received payload", payload);

  try {
    let newMsg = new Message();
    let { email, name, message, timestamp } = payload;
    newMsg.message = message;
    newMsg.timestamp = timestamp;
    newMsg.email = email;
    newMsg.name = name;
    console.log("New message", newMsg);
    await messageRepo.save(newMsg);
    console.log("done saving...");
  } catch (error) {
    console.log("Failed to send message!!!", error);
  }
};

export const getMessage = async (_, res) => {
  try {
    const allMessages = await messageRepo.find();
    res.status(200).json({
      message: "Messages received successfully!!!",
      data: allMessages,
    });
  } catch (error) {
    console.log("Failed to get messages!!!", error);
    res.status(500).json({ message: "Failed to get messages!!!" });
  }
};
