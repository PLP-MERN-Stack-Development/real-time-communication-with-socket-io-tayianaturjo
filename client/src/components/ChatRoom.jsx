import React, { useEffect, useState } from 'react';
import { useSocketContext } from '../context/SocketProvider';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UsersList from './UsersList';

export default function ChatRoom({ username }) {
  const {
    messages,
    users,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    socket,
  } = useSocketContext();

  const [room, setRoom] = useState("global");

  // Join the selected room
  useEffect(() => {
    if (!socket) return;

    socket.emit("join_room", room);

    return () => {
      socket.emit("leave_room", room);
    };
  }, [room, socket]);

  // Send normal group message
  const handleSend = (text) => {
    if (!text.trim()) return;
    sendMessage({ message: text, room });
  };

  // Typing indicator
  const handleTyping = (isTyping) => {
    setTyping({ isTyping, room });
  };

  // Send private message
  const handleSendPM = (toUser) => {
    const text = prompt(`Private message to ${toUser.username}:`);
    if (text?.trim()) {
      sendPrivateMessage(toUser.id, text);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* MAIN CHAT AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            padding: 10,
            borderBottom: "1px solid #eee",
            background: "#f8f8f8",
          }}
        >
          <strong>Socket.io Chat</strong> — Room: <b>{room}</b>
          <span style={{ float: "right" }}>
            Logged in as <b>{username}</b>
          </span>
        </header>

        {/* MESSAGE LIST */}
        <MessageList
          messages={messages.filter(
            (m) => m.room === room || (room === "global" && !m.room)
          )}
        />

        {/* MESSAGE INPUT */}
        <MessageInput onSend={handleSend} onTyping={handleTyping} />
      </div>

      {/* SIDEBAR */}
      <aside
        style={{
          width: 260,
          borderLeft: "1px solid #ddd",
          padding: 15,
          background: "#fafafa",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4 style={{ marginBottom: 10 }}>Rooms</h4>

        {["global", "sports", "tech"].map((r) => (
          <button
            key={r}
            onClick={() => setRoom(r)}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 8,
              borderRadius: 5,
              border: "none",
              cursor: "pointer",
              background: r === room ? "#007bff" : "#e8e8e8",
              color: r === room ? "white" : "black",
            }}
          >
            {r.toUpperCase()}
          </button>
        ))}

        <h4 style={{ marginTop: 20 }}>Online Users</h4>

        <UsersList
          users={users}
          onPrivateMessage={handleSendPM}
          currentUser={username}
        />
      </aside>
    </div>
  );
}
