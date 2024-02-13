import React, { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Chats from "./components/Chats/Chats";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    let userData = JSON.parse(sessionStorage.getItem("chatUser"));
    // console.log(userData);
    if (userData && userData.email && userData.name) {
      setIsLogged(true);
      setLoggedUser(userData);
    }
  }, []);
  return (
    <>
      {!isLogged && <Login />}
      {isLogged && <Chats loggedUser={loggedUser} />}
    </>
  );
}
