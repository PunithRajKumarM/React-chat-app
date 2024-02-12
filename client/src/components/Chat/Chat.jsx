import React from "react";
import classes from "./Chat.module.css";

export default function Chat() {
  return (
    <>
      <div className={classes.chatsPage}>
        <div className={classes.chatBox}>
          <div className={classes.chats}></div>
          <div className={classes.sendChat}>
            <input type="text" />
            <button>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}
