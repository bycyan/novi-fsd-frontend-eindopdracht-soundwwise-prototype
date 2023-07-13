// import React, { useState } from 'react';
//
// const EditDetailsForm = ({ pageDetails, onSave, onClose }) => {
//     const [details, setDetails] = useState(pageDetails);
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//     };
//
//     const handleSave = () => {
//         onSave(details);
//         onClose();
//     };
//
//     return (
//         <div className="modal overlay">
//             <div className="modal-content">
//                 <h2>Edit Details</h2>
//                 <form>
//                     <label htmlFor="projectName">Project Name:</label>
//                     <input
//                         type="text"
//                         id="projectName"
//                         name="projectName"
//                         value={details.projectName}
//                         onChange={handleChange}
//                     />
//
//                     <label htmlFor="projectArtist">Artist:</label>
//                     <input
//                         type="text"
//                         id="projectArtist"
//                         name="projectArtist"
//                         value={details.projectArtist}
//                         onChange={handleChange}
//                     />
//
//                     <div className="modal-actions">
//                         <button type="button" onClick={onClose}>
//                             Cancel
//                         </button>
//                         <button type="button" onClick={handleSave}>
//                             Save
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default EditDetailsForm;
