import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import classes from "./Chats.module.css";
import { convertTimestamp } from "../../timeStamp";
import Chat from "../Chat/Chat";

const socket = io.connect("http://localhost:4000");

export default function Chats({ loggedUser }) {
  const [message, setMessage] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const bottomScrollRef = useRef();

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
          // console.log(data);
          setUserMessages(data);
        }
      } catch (error) {
        console.log("Failed to fetch user messages", error);
      }
    }
    getUserMessageData();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`User connected (client): ${socket.id}`);
    });

    socket.on("receive-message", (data) => {
      // console.log("Received chat", data);
      setUserMessages((previousMessage) => [...previousMessage, data]);
    });

    if (bottomScrollRef.current) {
      bottomScrollRef.current.scrollIntoView();
    }

    return () => {
      socket.off("connect");
      socket.off("receive-message");
    };
  }, [userMessages]);

  function sendMessageHandler() {
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

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessageHandler();
    }
  }

  return (
    <>
      <div className={classes.chats}>
        {userMessages.length === 0 && null}
        {userMessages.length > 0 &&
          userMessages.map((u, i) => {
            return <Chat key={i} userChat={u} loggedUser={loggedUser} />;
          })}
        <div ref={bottomScrollRef}></div>
      </div>
      <div className={classes.sendChat}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message here"
          autoFocus
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button
          onClick={sendMessageHandler}
        >
          &rarr;
        </button>
      </div>
    </>
  );
}
