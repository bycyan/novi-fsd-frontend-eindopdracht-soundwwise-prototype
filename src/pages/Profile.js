import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ImageUploadForm from '../components/forms/ImageUploadForm';
import {updateUser, uploadImage} from "../services/api";

function Profile() {
    const { user } = useContext(AuthContext);

    const handleHeaderImageUpload = async (image) => {
        try {
            // Upload the header image and get the image URL
            const imageUrl = await uploadImage(image, user.token);

            // Update the user object with the new header image URL
            const updatedUser = { ...user, headerImg: imageUrl };

            // Update the user data in the backend
            await updateUser(user.id, updatedUser, user.token);

            console.log('Header image uploaded successfully.');
        } catch (error) {
            console.log('Error uploading header image:', error);
        }
    };

    const handleProfileImageUpload = async (image) => {
        try {
            // Upload the profile image and get the image URL
            const imageUrl = await uploadImage(image, user.token);

            // Update the user object with the new profile image URL
            const updatedUser = { ...user, profileImg: imageUrl };

            // Update the user data in the backend
            await updateUser(user.id, updatedUser, user.token);

            console.log('Profile image uploaded successfully.');
        } catch (error) {
            console.log('Error uploading profile image:', error);
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <div>
                        <h2>Upload Header Image</h2>
                        <ImageUploadForm onImageUpload={handleHeaderImageUpload} />
                    </div>
                    <div>
                        <h2>Upload Profile Image</h2>
                        <ImageUploadForm onImageUpload={handleProfileImageUpload} />
                    </div>
                    <img src={user.headerImg} alt="header-img" />
                    <img src={user.profileImg} alt="profile-img" />
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
