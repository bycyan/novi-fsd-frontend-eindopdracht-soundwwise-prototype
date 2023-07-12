import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

//User endpoints
//Collapse/Expand endpoints
export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/authenticate`, user);
        console.log('Response from /authenticate:', response); // For debugging
        const authToken = response.data.token;
        console.log('Response data:', response.data); // Logging the response data
        localStorage.setItem("authToken", authToken);
        return response.data;
        // return authToken;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};
export const validateToken = async (token) => {
    try {
        const response = await axios.post(`${BASE_URL}/authenticate`, { token });
        console.log('Token Validation Response:', response); // Add this line
        return response.data;
    } catch (error) {
        console.error("Token Validation Error:", error); // Add this line
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
    console.log("getUserById - userId:", userId);
    console.log("getUserById - token:", token);

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

//Project endpoints