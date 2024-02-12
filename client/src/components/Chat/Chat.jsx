import React from "react";
import io from "socket.io-client";
import classes from "./Chat.module.css";

const socket = io.connect("http://localhost:4000");

export default function Chat() {
  return (
    <>
      <div className={classes.chatsPage}>
        <div className={classes.chatBox}>
          <div className={classes.chats}>hello</div>
          <div className={classes.sendChat}>
            <input type="text" />
            <button>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}
