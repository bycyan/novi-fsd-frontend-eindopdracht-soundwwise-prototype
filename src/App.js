import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Nav from "./components/Nav";
import Music from "./pages/Music";
import Posts from "./pages/Posts";
import MusicDetail from "./pages/MusicDetail";

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
                <Route path={`/music/:projectId`} element={<MusicDetail />} />
            </Routes>
        </>
    );
}

export default App;
