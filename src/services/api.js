import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/authenticate`, user);
        const authToken = response.data.token;
        localStorage.setItem("authToken", authToken);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, user);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
};

export const getUserById = async (userId, token) => {
    try {
        if (userId && token) {
            const response = await axios.get(`${BASE_URL}/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
};




export const updateUser = async (userId, updatedUser) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/${userId}`, updatedUser);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
};

export const deleteUser = async (userId) => {
    try {
        await axios.delete(`${BASE_URL}/users/${userId}`);
    } catch (error) {
        console.log('Error:', error);
    }
};