import React, { useContext, useState } from 'react';
import { createSong } from '../../services/api';
import { AuthContext } from "../../context/AuthContext";

const AddSong = ({ projectId }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [filePath, setFilePath] = useState(null);

    const { user } = useContext(AuthContext);

    const handleSongTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleMp3FileChange = (e) => {
        const file = e.target.files[0];
        setFilePath(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('mp3File', filePath);

            const createdSong = await createSong(projectId, formData);

            console.log('Created song:', createdSong);

            setTitle('');
            setFilePath(null);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Add Song</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="songTitle">Song Title:</label>
                    <input
                        type="text"
                        id="songTitle"
                        value={title}
                        onChange={handleSongTitleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mp3File">MP3 File:</label>
                    <input
                        type="file"
                        id="mp3File"
                        accept=".mp3"
                        onChange={handleMp3FileChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Song'}
                </button>
            </form>
        </div>
    );
};

export default AddSong;
