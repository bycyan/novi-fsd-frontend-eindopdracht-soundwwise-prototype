import React, { useState } from 'react';
import { updateUser } from '../../services/api';

function EditProfileForm({ initialValue, userId, token, onCancel }) {
    const [firstName, setFirstName] = useState(initialValue.firstName);
    const [lastName, setLastName] = useState(initialValue.lastName);
    const [jobDescription, setJobDescription] = useState(initialValue.jobDescription);
    const [headerImg, setHeaderImg] = useState(initialValue.headerImg);
    const [profileImg, setProfileImg] = useState(initialValue.profileImg);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleJobDescriptionChange = (event) => {
        setJobDescription(event.target.value);
    };

    const handleProfileImgChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('profileImg', file);

            fetch('/upload-profile-image', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    // Handle the response from the server
                    console.log(data);
                })
                .catch((error) => {
                    // Handle any errors
                    console.error('Error:', error);
                });
        } else {
            setProfileImg(''); // Clear the profile image if no file is selected
        }
    };


    const handleCancel = () => {
        onCancel();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const authToken = localStorage.getItem('authToken');
        try {
            const updatedUser = {
                firstName,
                lastName,
                jobDescription,
                headerImg,
                profileImg,
                email: initialValue.email,
                password: initialValue.password
            };

            const response = await updateUser(userId, updatedUser, authToken);

            console.log("token", authToken);

            if (response) {
                console.log('User data updated:', response);
            } else {
                console.log('Error updating user data');
            }
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('Token expired, handle token expiration');
            } else {
                console.log('Error:', error);
            }
        }
    };

    return (
        <div className="modal">
            <div className="transparent-container form-container">
                <button type="button" onClick={handleCancel}>Cancel</button>
                <h3>Edit profile</h3>
                <form onSubmit={handleSubmit} className="inner-container form-float">
                    <input type="text" value={firstName} onChange={handleFirstNameChange} />
                    <input type="text" value={lastName} onChange={handleLastNameChange} />
                    <input
                        type="text"
                        value={jobDescription}
                        onChange={handleJobDescriptionChange}
                        placeholder="What do you do? e.g. songwriting etc."
                    />
                    {/*<input type="file" onChange={handleHeaderImgChange} accept="image/*" />*/}
                    <input type="file" onChange={handleProfileImgChange} accept="image/*" />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfileForm;
