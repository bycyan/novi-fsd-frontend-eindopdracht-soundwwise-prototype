// import React, {useContext, useState} from 'react';
// import { createProject } from '../../services/api';
// import {AuthContext} from "../../context/AuthContext";
//
// const AddProject = () => {
//     const [projectName, setProjectName] = useState('');
//     const [projectArtist, setProjectArtist] = useState('');
//     const [userId, setUserId] = useState('');
//     const [loading, setLoading] = useState(false);
//
//     const { user } = useContext(AuthContext); // use context to get the user
//
//     const handleProjectNameChange = (e) => {
//         setProjectName(e.target.value);
//     };
//
//     const handleProjectArtistChange = (e) => {
//         setProjectArtist(e.target.value);
//     };
//
//     const handleUserIdChange = (e) => {
//         setUserId(e.target.value);
//     }
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         try {
//             setLoading(true);
//             const project = {
//                 projectName: projectName,
//                 projectArtist: projectArtist,
//                 userId: userId,  // add user id to the project
//
//             };
//
//             // Replace `token` with the actual token value
//             const token = localStorage.getItem('authToken');
//             const createdProject = await createProject(project, token);
//
//             console.log('Created project:', createdProject);
//             // Handle success or perform any additional actions
//
//             setProjectName('');
//             setProjectArtist('');
//         } catch (error) {
//             console.error('Error:', error);
//             // Handle error or display error message
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div>
//             <h1>Add Project</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="projectName">Project Name:</label>
//                     <input
//                         type="text"
//                         id="projectName"
//                         value={projectName}
//                         onChange={handleProjectNameChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="projectArtist">Project Artist:</label>
//                     <input
//                         type="text"
//                         id="projectArtist"
//                         value={projectArtist}
//                         onChange={handleProjectArtistChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Creating...' : 'Create Project'}
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default AddProject;
