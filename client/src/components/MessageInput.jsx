import React, { useState } from "react";

export default function MessageInput({ onSend, onTyping }) {
  const [text, setText] = useState("");

  const send = () => {
    if (text.trim() !== "") {
      onSend(text);
      setText("");
    }
  };

  return (
    <div style={{ display: "flex", padding: 10, borderTop: "1px solid #eee" }}>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onTyping(true);
        }}
        onBlur={() => onTyping(false)}
        placeholder="Type here…"
        style={{ flex: 1, padding: 10 }}
      />

      <button onClick={send} style={{ marginLeft: 10, padding: "10px 20px" }}>
        Send
      </button>
    </div>
  );
}
