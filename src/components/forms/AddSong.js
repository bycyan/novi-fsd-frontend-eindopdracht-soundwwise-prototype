import React, { useContext, useState } from 'react';
import { createSong } from '../../services/api';
import { AuthContext } from "../../context/AuthContext";

const AddSong = () => {
    const [songTitle, setSongTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext); // use context to get the user

    const handleSongTitleChange = (e) => {
        setSongTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const song = {
                title: songTitle,
                projectId: user.selectedProjectId,  // access selectedProjectId directly from the user object
            };

            const createdSong = await createSong(song);

            console.log('Created song:', createdSong);
            // Handle success or perform any additional actions

            setSongTitle('');
        } catch (error) {
            console.error('Error:', error);
            // Handle error or display error message
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
                        value={songTitle}
                        onChange={handleSongTitleChange}
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