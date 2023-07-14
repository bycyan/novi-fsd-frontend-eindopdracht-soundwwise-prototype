import React, { useContext, useState } from 'react';
import { createSong } from '../../services/api';
import { AuthContext } from "../../context/AuthContext";

const AddSong = ({ projectId }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);

    const handleSongTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const song = {
                title: title
            };

            const createdSong = await createSong(projectId, song);

            console.log('Created song:', createdSong);

            setTitle('');
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Song'}
                </button>
            </form>
        </div>
    );
};

export default AddSong;