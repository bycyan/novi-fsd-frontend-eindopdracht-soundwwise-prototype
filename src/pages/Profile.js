import React, {useContext, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import EditProfileForm from '../components/forms/EditProfileForm';

function Profile() {
    const { user } = useContext(AuthContext);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => {
        setIsFormOpen(true);
    };

    //todo: EditProfileForm && include all fields
    //User is reset to null after updating

    return (
        <div>

            <h1>Profile</h1>
            {user ? (
                <div>
                    <img src={user.headerImg} alt="header-img" />
                    <img src={user.profileImg} alt="profile-img" />
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    <p>{user.jobDescription}</p>
                    <p>{user.userId}</p>

                    <div>
                        Projects:
                        <ul>
                            {user.projects.map((project) => (
                                <div key={project.projectId}>
                                    <img src={project.projectImage} alt="project-image"/>
                                    <h4>{project.projectName}</h4>
                                    <p>{project.projectArtist}</p>
                                </div>
                            ))}
                        </ul>
                    </div>

                    <button onClick={openForm}>Edit</button>
                    {isFormOpen && (
                        <>
                            <EditProfileForm
                                initialValue={user.firstName}
                                userId={user.userId}
                                token={user.token}
                            />
                        </>
                    )}

                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Profile;
