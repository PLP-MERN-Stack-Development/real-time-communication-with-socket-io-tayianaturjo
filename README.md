# Real-Time Chat Application with Socket.IO and React

## Project Overview

This project is a **real-time chat application** built using **React.js** for the frontend and **Node.js + Express + Socket.IO** for the backend. The app allows multiple users to chat in **rooms**, send **private messages**, view **online users**, and see **typing indicators** in real-time. It demonstrates the implementation of real-time communication, state management with React context, and handling user presence effectively.

---

## Features

1. **Real-Time Messaging**  
   - Send and receive messages instantly across all connected clients.  
   - Messages can be global or restricted to specific chat rooms.

2. **Room-Based Chat**  
   - Users can join multiple rooms (e.g., `global`, `sports`, `tech`).  
   - Messages are broadcasted to users in the same room only.

3. **Private Messaging**  
   - Users can send direct messages to other users privately.

4. **Online Users List**  
   - Displays all currently connected users in real-time.  
   - Updates dynamically as users join or leave.

5. **Typing Indicators**  
   - Shows which users are currently typing a message in a room.

6. **User Presence Handling**  
   - Detects when users connect or disconnect.  
   - Broadcasts `user_joined` and `user_left` events for awareness.

7. **State Management**  
   - Utilizes **React Context** and a custom `useSocket` hook for global socket state management.

---

## Tech Stack

- **Frontend:** React.js, JSX, Tailwind CSS (or plain CSS if preferred)  
- **Backend:** Node.js, Express.js, Socket.IO  
- **Real-Time Communication:** Socket.IO  
- **Environment Variables:** `dotenv`  
- **Development Tools:** Nodemon for auto-restart, React DevTools  

---

## Project Structure

### Backend (`server/`)

- **server.js**: Main server file handling Socket.IO events and HTTP routes.
- **Users & Messages:** Stored in memory for demo purposes.
- **API Endpoints:**  
  - `/api/messages` → Get all messages  
  - `/api/users` → Get all online users  

Socket events handled:  
- `connection`  
- `user_join`  
- `join_room` / `leave_room`  
- `send_message`  
- `private_message`  
- `typing`  
- `disconnect`  

---

### Frontend (`src/`)

- **SocketProvider.jsx**: Provides the Socket.IO connection and socket state to the React app.  
- **useSocket.js**: Custom hook managing socket events and states:  
  - `messages`, `users`, `typingUsers`, `lastMessage`, `isConnected`  
  - Methods: `connect`, `disconnect`, `sendMessage`, `sendPrivateMessage`, `setTyping`  

- **ChatRoom.jsx**: Main chat interface  
  - Displays messages, rooms, and online users  
  - Allows sending messages, private messaging, and typing detection  

- **MessageList.jsx**: Displays messages for the current room  
- **MessageInput.jsx**: Input box for sending messages  
- **UsersList.jsx**: Displays online users with private messaging option  

---

## Getting Started

### Prerequisites

- Node.js v18+  
- npm or yarn  
- React environment (Vite or Create React App)

### Installation

1. Clone the repository:
```bash
git clone <repository_url>
