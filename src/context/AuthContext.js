import React, { createContext, useState } from 'react';
export const AuthContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    const handleLogin = (userData, userId) => {
        setUser(userData);
        setUserId(userId);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, userId, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
