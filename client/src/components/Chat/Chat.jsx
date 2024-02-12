import React, { useState } from "react";
import io from "socket.io-client";
import classes from "./Chat.module.css";

const socket = io.connect("http://localhost:4000");

export default function Chat() {
  const [message, setMessage] = useState("");

  async function sendMessageHandler() {
    if (message !== "") {
      let data = JSON.parse(sessionStorage.getItem("chatUser"));
      let { email, name } = data;
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      let timestamp = `${hours}:${minutes}`;
      socket.emit("message", { message, email, name, timestamp });
      setMessage("");
    }
  }

  return (
    <>
      <div className={classes.chatsPage}>
        <div className={classes.chatBox}>
          <div className={classes.chats}></div>
          <div className={classes.sendChat}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message..."
              autoFocus
            />
            <button
              onClick={sendMessageHandler}
              style={{ fontSize: "x-large", color: "rgb(23, 23, 23)" }}
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
