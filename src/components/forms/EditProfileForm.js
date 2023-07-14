// import React, { useState } from 'react';
// import { updateUser } from '../../services/api';
//
// function EditProfileForm({ initialValue, userId, token }) {
//     const [firstName, setFirstName] = useState(initialValue.firstName);
//     const [lastName, setLastName] = useState(initialValue.lastName);
//     const [jobDescription, setJobDescription] = useState(initialValue.jobDescription);
//     const [headerImg, setHeaderImg] = useState(initialValue.headerImg);
//     const [profileImg, setProfileImg] = useState(initialValue.profileImg);
//
//     const handleFirstNameChange = (event) => {
//         setFirstName(event.target.value);
//     };
//
//     const handleLastNameChange = (event) => {
//         setLastName(event.target.value);
//     };
//
//     const handleJobDescriptionChange = (event) => {
//         setJobDescription(event.target.value);
//     };
//
//     const handleHeaderImgChange = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//
//         reader.onload = () => {
//             setHeaderImg(reader.result);
//         };
//
//         if (file) {
//             reader.readAsDataURL(file);
//         }
//     };
//
//     const handleProfileImgChange = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
//
//         reader.onload = () => {
//             setProfileImg(reader.result);
//         };
//
//         if (file) {
//             reader.readAsDataURL(file);
//         }
//     };
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             // Create an updatedUser object with the updated fields
//             const updatedUser = {
//                 firstName: firstName,
//                 lastName: lastName,
//                 jobDescription: jobDescription,
//                 headerImg: headerImg,
//                 profileImg: profileImg,
//                 email: initialValue.email,
//                 password: initialValue.password
//             };
//
//             // Call the updateUser API to update the user data with the updated fields
//             const response = await updateUser(userId, updatedUser, token);
//
//             // Check if the update was successful
//             if (response) {
//                 console.log('User data updated:', response);
//             } else {
//                 console.log('Error updating user data');
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 // Token expired, handle token expiration here (e.g., refresh token, reauthenticate)
//                 console.log('Token expired, handle token expiration');
//             } else {
//                 console.log('Error:', error);
//             }
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={firstName} onChange={handleFirstNameChange} />
//             <input type="text" value={lastName} onChange={handleLastNameChange} />
//             <input type="text" value={jobDescription} onChange={handleJobDescriptionChange} />
//             <input type="file" onChange={handleHeaderImgChange} accept="image/*" />
//             <input type="file" onChange={handleProfileImgChange} accept="image/*" />
//             <button type="submit">Save</button>
//         </form>
//     );
// }
//
// export default EditProfileForm;