import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import classes from "./Chats.module.css";
import { convertTimestamp } from "../../timestampHandler";
import Chat from "../Chat/Chat";
import Loader from "../../mui/Loader";
import MessageField from "../MessageField/MessageField";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

export default function Chats({ loggedUser }) {
  const [message, setMessage] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const bottomScrollRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUserMessageData() {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/getMessages`
        );
        if (!response.ok) {
          console.log("Failed to get user messages");
          return;
        }

        const { data } = await response.json();
        if (data) {
          setLoading(false);
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
      // let hours = new Date().getHours();
      // let minutes = new Date().getMinutes();
      // let timestamp = convertTimestamp(hours, minutes);
      let timestamp = new Date().valueOf().toString();
      // console.log(typeof timestamp);
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

  function logoutHandler() {
    sessionStorage.clear();
    window.location.reload();
  }

  return (
    <div className={classes.chatsWrapper}>
      <header className={classes.chatsHeader}>
        <p>Hello {loggedUser.name}</p>
        <button onClick={logoutHandler}>Logout</button>
      </header>

      <div className={loading ? classes.chatsLoader : classes.chats}>
        {userMessages.length === 0 && null}
        {loading && <Loader />}
        {userMessages.length > 0 &&
          userMessages.map((u, i) => {
            return <Chat key={i} userChat={u} loggedUser={loggedUser} />;
          })}
        <div ref={bottomScrollRef}></div>
      </div>

      <MessageField
        className={classes.sendChat}
        message={message}
        setMessage={setMessage}
        handleKeyDown={handleKeyDown}
        sendMessageHandler={sendMessageHandler}
      />
    </div>
  );
}
