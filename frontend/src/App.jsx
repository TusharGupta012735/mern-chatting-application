import { useState } from "react";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
