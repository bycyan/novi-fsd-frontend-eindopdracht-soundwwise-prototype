import React, { useContext, useState } from 'react';
import {createSong} from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const AddSong = ({ projectId }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');


    const { user } = useContext(AuthContext);

    const handleSongTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleMp3FileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const songItem = {
                title: title,
                filePath: file,
            };

            const createdSong = await createSong(user.id, projectId, songItem);

            console.log('Created song:', createdSong);
            // Handle success or perform any additional actions

            setTitle('');
            setFile(null);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            // Handle error or display error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal overlay">
            <h1>Add Song</h1>
            {error && <p className="error">{error}</p>}
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
