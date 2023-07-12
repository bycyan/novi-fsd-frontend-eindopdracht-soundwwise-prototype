import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateUser } from "../services/api";

function Profile() {
    const { user } = useContext(AuthContext);
    //
    // const [formValues, setFormValues] = useState({
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     // Add other form fields as needed
    // });
    //
    // const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Call the updateUser function to update the user data
    //         const updatedUser = await updateUser(user.id, formValues);
    //         // Handle the response or perform any additional actions
    //         console.log('User updated:', updatedUser);
    //         closeModal(); // Close the modal after submitting the form
    //     } catch (error) {
    //         console.log('Error:', error);
    //         // Handle the error or display an error message
    //     }
    // };
    //
    // const handleChange = (e) => {
    //     setFormValues((prevValues) => ({
    //         ...prevValues,
    //         [e.target.name]: e.target.value,
    //     }));
    // };
    //
    // const openModal = () => {
    //     setIsModalOpen(true);
    // };
    //
    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    return (
        <div>
            <h1>Profile</h1>
            {user && (
                <div>
                    <p>Account Non-Expired: {user.accountNonExpired.toString()}</p>
                    <p>Account Non-Locked: {user.accountNonLocked.toString()}</p>
                    <p>Credentials Non-Expired: {user.credentialsNonExpired.toString()}</p>
                    <p>Email: {user.email}</p>
                    <p>Enabled: {user.enabled.toString()}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>ID: {user.id}</p>
                    <p>Job Description: {user.jobDescription}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Password: {user.password}</p>
                    <p>Role: {user.role}</p>
                </div>
            )}
        </div>
    );
}

    {/*        /!* Render the edit button to open the modal *!/*/}
    {/*        <button onClick={openModal}>Edit</button>*/}

    {/*        /!* Render the modal form *!/*/}
    {/*        {isModalOpen && (*/}
    {/*            <div className="modal">*/}
    {/*                <form onSubmit={handleSubmit}>*/}
    {/*                    /!* Render the form fields *!/*/}
    {/*                    <label htmlFor="firstName">First Name:</label>*/}
    {/*                    <input*/}
    {/*                        type="text"*/}
    {/*                        id="firstName"*/}
    {/*                        name="firstName"*/}
    {/*                        value={formValues.firstName}*/}
    {/*                        onChange={handleChange}*/}
    {/*                    />*/}

    {/*                    <label htmlFor="lastName">Last Name:</label>*/}
    {/*                    <input*/}
    {/*                        type="text"*/}
    {/*                        id="lastName"*/}
    {/*                        name="lastName"*/}
    {/*                        value={formValues.lastName}*/}
    {/*                        onChange={handleChange}*/}
    {/*                    />*/}

    {/*                    <label htmlFor="email">Email:</label>*/}
    {/*                    <input*/}
    {/*                        type="email"*/}
    {/*                        id="email"*/}
    {/*                        name="email"*/}
    {/*                        value={formValues.email}*/}
    {/*                        onChange={handleChange}*/}
    {/*                    />*/}

    {/*                    /!* Render other form fields as needed *!/*/}

    {/*                    <button type="submit">Save</button>*/}
    {/*                    <button onClick={closeModal}>Cancel</button>*/}
    {/*                </form>*/}
    {/*            </div>*/}
    {/*        )}*/}
    {/*    </div>*/}
    {/*);*/}
{/*}*/}


export default Profile;
