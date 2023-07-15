import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import MusicDetail from './MusicDetail';
import AddProject from '../components/forms/AddProject'; // Import the AddProject component
import { Link, useParams } from 'react-router-dom';
import './Music.css';

function Music() {
    const { user } = useContext(AuthContext);

    const { projectId } = useParams(); // Get the projectId from the URL parameter
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => {
        setIsFormOpen(true);
    };

    const handleProjectClick = (projectId) => {
        setSelectedProjectId(projectId);
        console.log("Music-log: " + projectId);
    };



    return (
        <div>
            {user ? (
                <div className="container">
                    <section className="outer-container flex-container">
                        <div className="new-task-button">
                        <h6 onClick={openForm}>+ new project</h6>
                        </div>
                    </section>
                    <div>
                        {user.projects.map((project) => (
                            <section className="outer-container">
                            <Link
                                key={project.projectId}
                                to={`/music/${project.projectId}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div
                                    className="inner-container flex-container music-item link-to-project"
                                    onClick={() => handleProjectClick(project)}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <img
                                        className="music-item-img"
                                        src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/06/fdcd5a_d8dd6d540bd84e4e9df8cbcfa376ce0dmv2.jpg?resize=1000%2C1000&ssl=1"
                                        alt=""/>

                                    <div>
                                    <h5>{project.projectName}</h5>
                                    <p>{project.projectArtist}</p>
                                    </div>
                                </div>
                            </Link>
                            </section>

                        ))}
                    </div>

                    {isFormOpen && (
                        <AddProject /> // Render the AddProject component
                    )}

                    {/*{selectedProject || projectId ? (*/}
                    {/*    <MusicDetail*/}
                    {/*        project={selectedProject || user.projects.find((p) => p.projectId === parseInt(projectId))}*/}
                    {/*    />*/}
                    {/*) : (*/}
                    {/*    */}
                    {/*)}*/}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Music;