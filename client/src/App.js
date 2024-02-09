import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function App() {
  return (
    <>
      <GoogleOAuthProvider
        clientId={ProcessingInstruction.env.REACT_APP_CLIENT_ID}
      >
        App
      </GoogleOAuthProvider>
    </>
  );
}
