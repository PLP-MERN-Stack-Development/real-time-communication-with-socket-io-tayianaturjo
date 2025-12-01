// SocketProvider.jsx
import React from 'react';
import { useSocket } from '../socket/socket';

const SocketContext = React.createContext();

export function SocketProvider({ children, username }) {
  if (!username) {
    throw new Error("SocketProvider requires a username prop");
  }

  // Attach username to socket initialization
  const socketState = useSocket(username);

  return (
    <SocketContext.Provider value={socketState}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const ctx = React.useContext(SocketContext);
  if (!ctx) {
    throw new Error("useSocketContext must be used inside SocketProvider");
  }
  return ctx;
}
