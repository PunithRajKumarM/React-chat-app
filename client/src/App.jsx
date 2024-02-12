import React, { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    let userData = JSON.parse(sessionStorage.getItem("chatUser"));
    console.log(userData);
    if (userData && userData.email && userData.name) {
      setIsLogged(true);
      setUserData(userData);
    }
  }, []);
  return (
    <>
      {!isLogged && <Login />}
      {isLogged && <Chat />}
    </>
  );
}
