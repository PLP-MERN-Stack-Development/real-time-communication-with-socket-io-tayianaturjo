import React, { useState, useEffect } from 'react'
import Login from '../components/Login'
import ChatRoom from '../components/ChatRoom'
import { useSocketContext } from '../context/SocketProvider'


export default function Home(){
const [username, setUsername] = useState(localStorage.getItem('username') || '')
const socketState = useSocketContext()


useEffect(() => {
if (Notification && Notification.permission !== 'granted') {
Notification.requestPermission()
}
}, [])


if (!username) return <Login onLogin={(u) => { setUsername(u); localStorage.setItem('username', u); socketState.connect(u); }} />


return <ChatRoom username={username} />
}