import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SomeOtherPage from "./pages/SomeOtherPage";

function App() {
    return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/test" element={<SomeOtherPage />} />
            </Routes>
    );
}

export default App;
