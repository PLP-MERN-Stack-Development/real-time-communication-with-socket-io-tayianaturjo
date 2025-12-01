import React, { useState } from 'react'


export default function Login({ onLogin }){
const [name, setName] = useState('')
return (
<div style={{padding:20}}>
<h2>Enter a display name</h2>
<input value={name} onChange={e=>setName(e.target.value)} />
<button onClick={()=>name && onLogin(name)}>Join</button>
</div>
)
}