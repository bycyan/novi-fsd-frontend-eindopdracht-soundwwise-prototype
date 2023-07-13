import React, { useState } from 'react';

const ImageUploadForm = ({ onImageUpload }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedImage) {
            // Call the onImageUpload function passed as a prop
            onImageUpload(selectedImage);
        }

        // Reset the selectedImage state after handling the image upload
        setSelectedImage(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Upload Image</button>
        </form>
    );
};

export default ImageUploadForm;
