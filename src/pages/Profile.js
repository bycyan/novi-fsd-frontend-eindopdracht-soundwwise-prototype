import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Profile() {
    const { user} = useContext(AuthContext);

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <img src={user.headerImg} alt="profile-img"/>
                    <img src={user.profileImg} alt="profile-img"/>
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    <p>{user.jobDescription}</p>
                    <div>
                        Projects:
                        <ul>
                            {user.projects.map((project) => (
                                <li key={project.id}>{project.projectName}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Profile;
