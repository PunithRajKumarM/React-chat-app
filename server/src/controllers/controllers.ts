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

export const getMessage = async () => {
  try {
    const allMessages = await messageRepo.find();
    console.log(allMessages);
  } catch (error) {
    console.log("Failed to get messages!!!", error);
  }
};

export const sendMessage = async (message) => {
  try {
    let newMsg = new Message();
    await messageRepo.save(newMsg);
  } catch (error) {
    console.log("Failed to send message!!!", error);
  }
};

// export const sendMessage = async (req: Request, res: Response) => {
//   try {
//     let newMsg = new Message();
//     let { content, timestamp } = req.body;
//     newMsg.content = content;
//     newMsg.timestamp = timestamp;
//     await messageRepo.save(newMsg);
//     res.status(201).json({ message: "Message sent successfully!!!" });
//   } catch (error) {
//     console.log("Failed to send message!!!", error);
//     res.status(500).json({ message: "Failed to send message!!!" });
//   }
// };

// export const getMessage = async (req, res) => {
//   try {
//     let userId = req.session.userId;
//     const messages = await messageRepo.find({ where: { userId } });
//     res
//       .status(200)
//       .json({ message: "Messages received successfully!!!", data: messages });
//   } catch (error) {
//     console.log("Failed to get messages!!!", error);
//     res.status(500).json({ message: "Failed to get messages!!!" });
//   }
// };
