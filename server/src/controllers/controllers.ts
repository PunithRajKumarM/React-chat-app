require("dotenv").config();
import { OAuth2Client } from "google-auth-library";
import { AppDataSource } from "../data-source";
import { Message } from "../entity/Message";
import { Request, Response } from "express";

const messageRepo = AppDataSource.getRepository(Message);

export const googleAuth = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectUrl = "http://localhost:3000";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });
};

// get User

export const sendMessage = async (req: Request, res: Response) => {
  try {
    let newMsg = new Message();
    let { content, timestamp } = req.body;
    newMsg.content = content;
    newMsg.timestamp = timestamp;
    await messageRepo.save(newMsg);
    res.status(201).json({ message: "Message sent successfully!!!" });
  } catch (error) {
    console.log("Failed to send message!!!", error);
    res.status(500).json({ message: "Failed to send message!!!" });
  }
};

export const getMessage = async (req, res) => {
  try {
    let userId = req.session.userId;
    const messages = await messageRepo.find({ where: { userId } });
    res
      .status(200)
      .json({ message: "Messages received successfully!!!", data: messages });
  } catch (error) {
    console.log("Failed to get messages!!!", error);
    res.status(500).json({ message: "Failed to get messages!!!" });
  }
};
