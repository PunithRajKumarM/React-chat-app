import React from "react";
import classes from "./Chat.module.css";

export default function Chat({ userChat, loggedUser }) {
  return (
    <div
      className={
        userChat.email === loggedUser.email
          ? `${classes.chatWrapper} ${classes.you}`
          : classes.chatWrapper
      }
    >
      <p className={classes.chatUserName}>{userChat.username}</p>
      <span className={classes.chatContent}>{userChat.content}</span>
      <p className={classes.chatTimestamp}>{userChat.timestamp}</p>
    </div>
  );
}
