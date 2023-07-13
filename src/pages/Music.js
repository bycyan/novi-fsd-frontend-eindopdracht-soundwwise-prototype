// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import MusicDetail from './MusicDetail';
// import AddProject from '../components/forms/AddProject'; // Import the AddProject component
// import { Link, useParams } from 'react-router-dom';
//
// function Music() {
//     const { user } = useContext(AuthContext);
//
//     const { projectId } = useParams(); // Get the projectId from the URL parameter
//     const [selectedProject, setSelectedProject] = useState(null);
//     const [selectedProjectId, setSelectedProjectId] = useState(null);
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [newProjectName, setNewProjectName] = useState('');
//     const [newProjectArtist, setNewProjectArtist] = useState('');
//
//     const openForm = () => {
//         setIsFormOpen(true);
//     };
//
//     const handleProjectClick = (projectId) => {
//         setSelectedProjectId(projectId);
//         console.log("Music-log: " + projectId);
//     };
//
//
//
//     return (
//         <div>
//             <h1>Music</h1>
//             {user ? (
//                 <div>
//                     <div>
//                         {user.projects.map((project) => (
//                             <Link
//                                 key={project.id}
//                                 to={`/music/${project.projectId}`}
//                                 style={{ textDecoration: 'none' }}
//                             >
//                                 <div
//                                     onClick={() => handleProjectClick(project)}
//                                     style={{
//                                         cursor: 'pointer',
//                                         padding: '10px',
//                                         border: '1px solid gray',
//                                         borderRadius: '4px',
//                                     }}
//                                 >
//                                     <h3>{project.projectName}</h3>
//                                     <p>{project.projectArtist}</p>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                     <button onClick={openForm}>Add</button>
//                     {isFormOpen && (
//                         <AddProject /> // Render the AddProject component
//                     )}
//                     {selectedProject || projectId ? (
//                         <MusicDetail
//                             project={selectedProject || user.projects.find((p) => p.projectId === parseInt(projectId))}
//                         />
//                     ) : (
//                         <p>Select a project to view details</p>
//                     )}
//                 </div>
//             ) : (
//                 <p>Loading user data...</p>
//             )}
//         </div>
//     );
// }
//
// export default Music;

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import MusicDetail from './MusicDetail';
import AddProject from '../components/forms/AddProject';
import { Link, useParams } from 'react-router-dom';
import {getProjectById} from "../services/api";

function Music() {
    const { user } = useContext(AuthContext);

    const { projectId } = useParams();
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [projects, setProjects] = useState([]); // State to store projects

    useEffect(() => {
        // Fetch projects when the component mounts

        void fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const projects = await getProjectById(user.id); // Call the getUserProjects function with the userId
            setProjects(projects); // Set the fetched projects in the state
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setSelectedProjectId(project.id);
        console.log('Music-log: ' + project.id);
    };

    return (
        <div>
            <h1>Music</h1>
            {user ? (
                <div>
                    <div>
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                to={`/music/${project.projectId}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div
                                    onClick={() => handleProjectClick(project)}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '10px',
                                        border: '1px solid gray',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <h3>{project.projectName}</h3>
                                    <p>{project.projectArtist}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <button onClick={openForm}>Add</button>
                    {isFormOpen && <AddProject />}
                    {(selectedProject || projectId) ? (
                        <MusicDetail
                            project={
                                selectedProject || projects.find(
                                    (p) => p.projectId === parseInt(projectId)
                                )
                            }
                        />
                    ) : (
                        <p>Select a project to view details</p>
                    )}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Music;
