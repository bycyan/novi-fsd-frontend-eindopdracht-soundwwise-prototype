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

// export const fetchUser = async (userId, setUser) => {
//     try {
//         if (userId) {
//             const response = await axios.get(`${BASE_URL}/users/${userId}`);
//             setUser(response.data);
//         }
//     } catch (error) {
//         console.log('Error fetching user data:', error);
//     }
// };