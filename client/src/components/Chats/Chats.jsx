import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import classes from "./Chats.module.css";
import { convertTimestamp } from "../../timeStamp";
import Chat from "../Chat/Chat";

const socket = io.connect("http://localhost:4000");

export default function Chats({ loggedUser }) {
  const [message, setMessage] = useState("");
  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    async function getUserMessageData() {
      try {
        const response = await fetch("http://localhost:4000/getMessages");
        if (!response.ok) {
          console.log("Failed to get user messages");
          return;
        }
        const { data } = await response.json();
        if (data) {
          console.log(data);
          setUserMessages(data);
        }
      } catch (error) {
        console.log("Failed to fetch user messages", error);
      }
    }
    getUserMessageData();
  }, [setUserMessages]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`User connected (client): ${socket.id}`);
    });

    socket.on("receive-message", async (data) => {
      console.log("Received chat", data);
      if (data) {
        const { message, email, name, timestamp } = data;
        await fetch("http://localhost:4000/sendMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, email, name, timestamp }),
        });
      }
    });
    return () => {
      socket.off("connect");
      socket.off("receive-message");
    };
  }, []);

  async function sendMessageHandler() {
    if (message !== "") {
      let data = JSON.parse(sessionStorage.getItem("chatUser"));
      let { email, name } = data;
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      let timestamp = convertTimestamp(hours, minutes);
      socket.emit("chat", { message, email, name, timestamp });
      setMessage("");
    }
  }

  return (
    <>
      <div className={classes.chatsPage}>
        <div className={classes.chatBox}>
          <div className={classes.chats}>
            {userMessages.length === 0 && null}
            {userMessages.length > 0 &&
              userMessages.map((u, i) => {
                return <Chat key={i} userChat={u} loggedUser={loggedUser} />;
              })}
          </div>
          <div className={classes.sendChat}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message..."
              autoFocus
            />
            <button onClick={sendMessageHandler}>&rarr;</button>
          </div>
        </div>
      </div>
    </>
  );
}
