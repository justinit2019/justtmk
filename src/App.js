// React Frontend (src/App.js)

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => socket.off("chat message");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div style={{ border: "1px solid #ccc", height: 300, overflowY: "scroll", padding: 10 }}>
        {chat.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "80%" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
