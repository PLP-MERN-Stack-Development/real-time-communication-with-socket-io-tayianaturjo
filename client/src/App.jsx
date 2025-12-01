import React from 'react'
import Home from './pages/Home'
import { SocketProvider } from './context/SocketProvider'

export default function App() {
  return (
    <SocketProvider username="Elijah">
      <Home />
    </SocketProvider>
  )
}
