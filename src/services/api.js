import axios from 'axios';
import jwt_decode from "jwt-decode";

const BASE_URL = 'http://localhost:8080';
const authToken = localStorage.getItem('authToken');

// Create an Axios instance with default headers
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
});


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
        const response = await axiosInstance.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
};

// export const getUserById = async (id, token) => {
//     console.log("userId:", id);
//     console.log("token:", token);
//
//     try {
//         if (id && token) {
//             const response = await axiosInstance.get(`${BASE_URL}/users/${encodeURIComponent(id)}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log("getUserById - response:", response.data.userId);
//             return response.data;
//         }
//     } catch (error) {
//         console.log('Error:', error);
//         return null;
//     }
// };

// export const getUserById = async (id, token) => {
//     try {
//         if (token) {
//             console.log("About to decode token:", token);
//             const decodedToken = jwt_decode(token);
//             const userId = decodedToken.sub; // 'sub' property usually holds the user id
//             console.log("userId:", userId);
//
//             const response = await axiosInstance.get(`${BASE_URL}/users/${encodeURIComponent(userId)}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log("getUserById - user id response:", response.data.userId);
//             return response.data;
//         }
//     } catch (error) {
//         console.log('Error:', error);
//         return null;
//     }
// };

export const getUserById = async (user, token) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/users/${user}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log("User fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const updateUser = async (userId, updatedUser, token) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/users/${userId}`, updatedUser, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
};

export const uploadImage = async (file, token) => {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axiosInstance.post(`${BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.imageUrl; // Assuming the response contains the uploaded image URL
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
};


export const deleteUser = async (userId) => {
    try {
        await axiosInstance.delete(`${BASE_URL}/users/${userId}`);
    } catch (error) {
        console.log('Error:', error);
    }
};

//Project endpoints

// Get all projects
export const getAllProjects = () => {
    return axiosInstance.get(`${BASE_URL}/projects`);
};

// Get project by ID
export const getProjectById = (projectId) => {
    return axiosInstance.get(`${BASE_URL}/projects/${projectId}`);
};

// Create project
export const createProject = async (project, token) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/projects`, project, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log("Response from server:", response);

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};











// Update project
// export const updateProject = (project => {
//     return axiosInstance.put(`${BASE_URL}/projects/${project.projectId}`, project);
// };


// Delete project
export const deleteProject = (projectId) => {
    return axiosInstance.delete(`${BASE_URL}/projects/${projectId}`);
};

// Get contributors by project ID
export const getContributorsByProjectId = (projectId) => {
    return axiosInstance.get(`${BASE_URL}/projects/${projectId}/contributors`);
};

// Add contributor to project
export const addContributorToProject = (projectId, contributor) => {
    return axiosInstance.post(`${BASE_URL}/projects/${projectId}/contributors`, contributor);
};

// Remove contributor from project
export const removeContributorFromProject = (projectId, contributorName) => {
    return axiosInstance.delete(`${BASE_URL}/projects/${projectId}/contributors/${contributorName}`);
};

// Get all songs by project ID
export const getAllSongsByProjectId = (projectId) => {
    return axiosInstance.get(`${BASE_URL}/projects/${projectId}/songs`);
};

// Get all files by project ID
export const getAllFilesByProjectId = (projectId) => {
    return axiosInstance.get(`${BASE_URL}/projects/${projectId}/files`);
};

export {axiosInstance};