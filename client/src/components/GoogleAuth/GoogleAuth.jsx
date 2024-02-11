import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleAuth() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login failed!!!");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
}
