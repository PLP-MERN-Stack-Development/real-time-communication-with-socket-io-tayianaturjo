// socket.js
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

// Socket.io connection URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Create socket instance
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Custom hook for using socket.io
export const useSocket = (username) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  // Connect to socket server with username
  const connect = () => {
    socket.connect();
    if (username) {
      socket.emit('user_join', username);
    }
  };

  // Disconnect
  const disconnect = () => {
    socket.disconnect();
  };

  // Send a message
  const sendMessage = ({ message, room }) => {
    socket.emit('send_message', { message, room });
  };

  // Send private message
  const sendPrivateMessage = (to, message) => {
    socket.emit('private_message', { to, message });
  };

  // Set typing indicator
  const setTyping = ({ isTyping, room }) => {
    socket.emit('typing', { isTyping, room });
  };

  // Socket event listeners
  useEffect(() => {
    connect();

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    const onReceiveMessage = (msg) => setMessages((prev) => [...prev, msg]);
    const onPrivateMessage = (msg) => setMessages((prev) => [...prev, msg]);

    const onUserList = (userList) => setUsers(userList);

    const onUserJoined = (user) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), system: true, message: `${user.username} joined the chat`, timestamp: new Date().toISOString() },
      ]);
    };

    const onUserLeft = (user) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), system: true, message: `${user.username} left the chat`, timestamp: new Date().toISOString() },
      ]);
    };

    const onTypingUsers = (typingList) => setTypingUsers(typingList);

    // Register listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('private_message', onPrivateMessage);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('typing_users', onTypingUsers);

    // Cleanup
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
      socket.off('private_message', onPrivateMessage);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('typing_users', onTypingUsers);
    };
  }, [username]);

  return {
    socket,
    isConnected,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  };
};

export default socket;
