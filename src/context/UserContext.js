import React, { createContext, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext(null);

const BASE_URL = 'http://localhost:8080';

export const fetchUser = async (userId, setUser) => {
    try {
        if (userId) {
            const response = await axios.get(`${BASE_URL}/users/${userId}`);
            setUser(response.data);
        }
    } catch (error) {
        console.log('Error fetching user data:', error);
    }
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    const handleLogin = (userData, userId) => {
        setUser(userData);
        setUserId(userId);
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, userId, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
