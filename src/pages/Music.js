import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Music() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Music</h1>
            {user ? (
                <div>
                    <div>
                        {user.projects.map((project) => (
                            <div key={project.id}>
                                <h3>{project.projectName}</h3>
                                <p>{project.projectArtist}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Music;