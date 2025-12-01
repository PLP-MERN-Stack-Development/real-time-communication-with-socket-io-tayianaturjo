import React from "react";

export default function UsersList({ users, onSelectUser }) {
  return (
    <div style={{ padding: 10 }}>
      <h3>Users</h3>
      {users.map((u) => (
        <div
          key={u.id}
          onClick={() => onSelectUser(u)}
          style={{ padding: 5, cursor: "pointer" }}
        >
          {u.username}
        </div>
      ))}
    </div>
  );
}
