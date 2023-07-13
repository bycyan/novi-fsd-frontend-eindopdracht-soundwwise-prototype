import axios from 'axios';

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


//Authentication endpoints
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


//User endpoints
export const getUserById = async (user) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/users/${user}`);
        console.log("getUserById", response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const updateUser = async (userId, updatedUser, token) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/users/${userId}`, updatedUser, {
        });
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
};

// export const deleteUser = async (userId) => {
//     try {
//         await axiosInstance.delete(`${BASE_URL}/users/${userId}`);
//     } catch (error) {
//         console.log('Error:', error);
//     }
// };

//Project endpoints
export const getAllProjects = () => {
    return axiosInstance.get(`${BASE_URL}/projects`);
};

export const getProjectById = (projectId) => {
    return axiosInstance.get(`${BASE_URL}/projects/${projectId}`);
};

// export const createProject = async (project, token) => {
//     try {
//         const BASE_URL = 'https://example.com'; // Replace with your base URL
//
//         // eslint-disable-next-line react-hooks/rules-of-hooks
//         const { user } = useContext(AuthContext); // Assuming you have the AuthContext available
//
//         project.user = {
//             userId: user.userId
//         };
//         console.log("Projects user id?:", user.userId);
//
//         const response = await axiosInstance.post(`${BASE_URL}/projects`, project, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//         });
//
//         console.log("Response from server:", response);
//
//         return response.data;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// };












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