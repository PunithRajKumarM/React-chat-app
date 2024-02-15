import React from "react";
import SendIcon from "@mui/icons-material/Send";

export default function MessageField({
  className,
  message,
  setMessage,
  handleKeyDown,
  sendMessageHandler,
}) {
  return (
    <div className={className}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Start sending message..."
        autoFocus
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button onClick={sendMessageHandler} disabled={!message}>
        <SendIcon />
      </button>
    </div>
  );
}
