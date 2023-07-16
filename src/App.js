import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Nav from "./components/Nav";
import Music from "./pages/Music";
import Posts from "./pages/Posts";
import MusicDetail from "./pages/MusicDetail";
import "./assests/global.css";
import UpperNav from "./components/UpperNav";

function App() {
    const location = useLocation();
    const hideNav = location.pathname.startsWith("/music/") || location.pathname === "/";


    return (
        <>
            {!hideNav && <UpperNav />}
            {!hideNav && <Nav />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/music" element={<Music />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/music/:projectId" element={<MusicDetail />} />
            </Routes>
        </>
    );
}

export default App;
