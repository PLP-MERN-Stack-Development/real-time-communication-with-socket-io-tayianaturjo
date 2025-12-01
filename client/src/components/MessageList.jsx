import React from "react";

export default function MessageList({ messages }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
      {messages.map((msg, index) => (
        <div key={index} style={{ marginBottom: 8 }}>
          <strong>{msg.username || "System"}:</strong> {msg.message}
        </div>
      ))}
    </div>
  );
}
