import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const loginHandler = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    let { email, name } = decoded;
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/googleLogin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      }
    );
    if (!response.ok) {
      console.log("Failed to create!");
    } else {
      const { data } = await response.json();
      let chatUser = { email, name };
      sessionStorage.setItem("chatUser", JSON.stringify(chatUser));
      if (data) {
        window.location.reload();
      }
    }
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "rgb(23,23,23)",
          height: "100dvh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            loginHandler(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </>
  );
}
