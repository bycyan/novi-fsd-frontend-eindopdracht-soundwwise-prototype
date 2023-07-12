import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Nav from "./components/Nav";
import Music from "./pages/Music";
import Posts from "./pages/Posts";

function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/music" element={<Music />} />
                <Route path="/posts" element={<Posts />} />
            </Routes>
        </>
    );
}

export default App;
