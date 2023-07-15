import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import EditProfileForm from '../components/forms/EditProfileForm';
import './Profile.css';
import {Link} from "react-router-dom";

function Profile() {
    const { user } = useContext(AuthContext);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleForm = () => {
        setIsFormOpen(!isFormOpen);
    };

    const handleCancel = () => {
        setIsFormOpen(false);
    };

    return (
        <div className="container">
            {user ? (
                <div>
                    <div className="profile-cover-img"><img
                        src="https://as1.ftcdn.net/v2/jpg/02/80/37/88/1000_F_280378886_GmipikDFJken17oeXsnllSI46qzlKm8R.jpg"
                        alt=""/>
                        {/*todo: implement profile-img/header-img upload*/}
                        {/*<img src={user.headerImg} alt="header-img" />*/}
                    </div>
                    <section className="outer-container profile-header-section">
                        <img src="https://www.postendekker.nl/wp-content/uploads/2021/10/dummy-profile.jpg" alt="profile-img" />
                        {/*<img src={user.profileImg} alt="profile-img" />*/}
                        <h3>{user.firstName} {user.lastName}</h3>
                        <h6>{user.jobDescription}</h6>
                        <button onClick={toggleForm}>
                            {isFormOpen ? 'Cancel' : 'Edit'} {/* Change button text based on the form state */}
                        </button>
                    </section>



                    <div>
                        <section className="outer-container profile-experience-section">
                            <div className="header flex-container">
                                <h4>Showcases</h4>
                            </div>
                            <ul>
                                {user.projects.map((project) => (
                                    <div key={project.projectId}>
                                        <Link
                                            className="link-to-project"
                                            to={`/music/${project.projectId}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div>
                                                <div className="experience-item">
                                                    <div className="flex-container">
                                                        <img
                                                            src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/06/fdcd5a_d8dd6d540bd84e4e9df8cbcfa376ce0dmv2.jpg?resize=1000%2C1000&ssl=1"
                                                            alt=""
                                                        />
                                                        {/*todo: implement fetching project-image*/}
                                                        {/* <img src={project.projectImage} alt="project-image" /> */}
                                                        <div className="info">
                                                            <h5>{project.projectName}</h5>
                                                            <h6>{project.projectArtist}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </ul>
                        </section>
                    </div>




                    {isFormOpen && (
                        <EditProfileForm
                            initialValue={user}
                            userId={user.id}
                            token={user.token}
                            onCancel={handleCancel}
                        />
                    )}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Profile;
