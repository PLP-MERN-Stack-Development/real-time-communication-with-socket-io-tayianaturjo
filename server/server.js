// server.js - Improved Socket.io Chat Server

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// In-memory storage
const users = {};
const messages = [];
const typingUsers = {};

// Socket.io
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins chat
  socket.on("user_join", (username) => {
    if (!username) return;

    users[socket.id] = { username, id: socket.id };

    io.emit("user_list", Object.values(users));
    io.emit("user_joined", users[socket.id]);

    console.log(`${username} joined`);
  });

  // Public message
  socket.on("send_message", (data) => {
    if (!data?.message || !data.message.trim()) return;

    const msg = {
      id: uuidv4(),
      message: data.message,
      sender: users[socket.id]?.username || "Anonymous",
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      isPrivate: false,
    };

    messages.push(msg);
    if (messages.length > 100) messages.shift();

    io.emit("receive_message", msg);
  });

  // Typing indicator
  socket.on("typing", (isTyping) => {
    if (!users[socket.id]) return;

    if (isTyping) typingUsers[socket.id] = users[socket.id].username;
    else delete typingUsers[socket.id];

    io.emit("typing_users", Object.values(typingUsers));
  });

  // Private messages
  socket.on("private_message", ({ to, message }) => {
    if (!message || !users[to]) return;

    const messageData = {
      id: uuidv4(),
      sender: users[socket.id].username,
      senderId: socket.id,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
    };

    socket.to(to).emit("private_message", messageData);
    socket.emit("private_message", messageData);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    if (users[socket.id]) {
      const username = users[socket.id].username;
      io.emit("user_left", { username, id: socket.id });
      console.log(`${username} left`);
    }

    delete users[socket.id];
    delete typingUsers[socket.id];

    io.emit("user_list", Object.values(users));
    io.emit("typing_users", Object.values(typingUsers));
  });
});

// API Routes
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.get("/api/users", (req, res) => {
  res.json(Object.values(users));
});

// Root route
app.get("/", (req, res) => {
  res.send("Socket.io Chat Server is running");
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));

module.exports = { app, server, io };
