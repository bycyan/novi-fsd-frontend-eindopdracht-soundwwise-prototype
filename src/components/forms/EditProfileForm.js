import React, { useState } from 'react';
import { updateUser } from '../../services/api';

function EditProfileForm({ initialValue, userId, token }) {
    const [firstName, setFirstName] = useState(initialValue.firstName);

    const handleChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Create an updatedUser object with the updated firstName and the existing lastName
            const updatedUser = {
                firstName: firstName,
                lastName: initialValue.lastName
            };

            // Call the updateUser API to update the user data with the updated firstName
            const response = await updateUser(userId, updatedUser, token);

            // Check if the update was successful
            if (response) {
                console.log('User data updated:', response);
            } else {
                console.log('Error updating user data');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Token expired, handle token expiration here (e.g., refresh token, reauthenticate)
                console.log('Token expired, handle token expiration');
            } else {
                console.log('Error:', error);
            }
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={firstName}
                onChange={handleChange}
            />
            <button type="submit">Save</button>
        </form>
    );
}

export default EditProfileForm;
