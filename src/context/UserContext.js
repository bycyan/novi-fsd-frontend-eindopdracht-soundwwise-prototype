import React, { createContext, useState } from 'react';
import axios from 'axios';
import Profile from '../pages/Profile';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    const handleLogin = (userData, userId) => {
        setUser(userData);
        setUserId(userId);
    };

    const fetchUser = async () => {
        try {
            if (userId) {
                const response = await axios.get(`/users/${userId}`);
                setUser(response.data);
                console.log('User data:', response.data);

            }
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, handleLogin }}>
            {children}
            {user !== null && <Profile fetchUser={fetchUser} />}
        </UserContext.Provider>
    );
};
