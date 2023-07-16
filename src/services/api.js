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

export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

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
    console.log(token);
    console.log(updatedUser);
    console.log(userId)
    try {
        const response = await axiosInstance.put(
            `${BASE_URL}/users/${userId}`,
            updatedUser,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log('Error:', error);
        return null;
    }
};

// export const updateUser = async (userId, updatedUser, profileImgFile, token) => {
//     console.log(token);
//     console.log(updatedUser);
//     console.log(userId);
//
//     try {
//         const formData = new FormData();
//         formData.append('profileImg', profileImgFile);
//         formData.append('user', JSON.stringify(updatedUser));
//
//         const response = await axiosInstance.put(`${BASE_URL}/users/${userId}`, formData, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//
//         return response.data;
//     } catch (error) {
//         console.log('Error:', error);
//         return null;
//     }
// };

export const deleteTask = async (taskId, token, userId, updatedUser, user) => {
    console.log("Token: ", token);
    console.log("Task id: ", taskId);
    console.log("User id: ", userId);
    console.log("Updated user data: ", updatedUser); // Log the updated user data

    try {
        await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const updatedUserWithTasks = {
            ...updatedUser,
            tasks: user.tasks.filter((task) => task.taskId !== taskId)
        };

        await updateUser(userId, updatedUserWithTasks, token);
        console.log("Updated user data: ", updatedUserWithTasks);

        console.log('Task deleted and user updated successfully.');
    } catch (error) {
        console.error('Error:', error);
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

export const getAllSongs = async (projectId, token) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/songs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                projectId: projectId,
            }
        });


        return response.data;

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};


export const createSong = async (userId, projectId, songItem) => {
    try {
        return await axiosInstance.post(`${BASE_URL}/songs`, {
            ...songItem,
            user: {
                userId: userId
            },
            project: {
                projectId: projectId
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};




    export const createProject = (userId, project) => {
        try {
            const {projectId, ...rest} = project; // Destructure the projectId from the project object
            return axiosInstance.post(`${BASE_URL}/projects`, {
                ...rest, // Spread the rest of the project properties
                user: {
                    userId: userId
                },
                project: {
                    projectId: projectId // Add the projectId separately
                }
            });
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    export const createTask = (userId, task) => {
        try {
            const {taskId, ...rest} = task; // Destructure the projectId from the project object
            return axiosInstance.post(`${BASE_URL}/tasks`, {
                ...rest, // Spread the rest of the project properties
                user: {
                    userId: userId
                },
                task: {
                    taskId: taskId // Add the projectId separately
                }
            });
        } catch (error) {
            console.error('Error:', error);
            return null;
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
// export const getAllSongsByProjectId = (projectId) => {
//     return axiosInstance.get(`${BASE_URL}/projects/${projectId}/songs`);
// };

// Get all files by project ID
    export const getAllFilesByProjectId = (projectId) => {
        return axiosInstance.get(`${BASE_URL}/projects/${projectId}/files`);
    };

    export {axiosInstance};