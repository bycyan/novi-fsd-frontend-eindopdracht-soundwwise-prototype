import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getProjectById, getAllSongs } from '../services/api';
import { useParams } from 'react-router-dom';
import AddSong from "../components/forms/AddSong";

const MusicDetail = () => {
    const { user } = useContext(AuthContext);
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    console.log('User:', user);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await getProjectById(projectId);
                setProject(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Error:', error);
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await getAllSongs(projectId, token);
                setSongs(response.data);
                console.log(token)
            } catch (error) {
                console.log('Error:', error);
            }
        };


        fetchSongs();
    }, [projectId]);

    const openForm = () => {
        setIsFormOpen(true);
    };

    if (loading) {
        return <p>Loading project details...</p>;
    }

    if (!project) {
        return <p>Project not found</p>;
    }

    const { projectName, projectArtist } = project;

    return (
        <div>
            <h1>Music Detail</h1>
            <h3>Project Name: {projectName}</h3>
            <p>Artist: {projectArtist}</p>

            <button onClick={openForm}>Add Song</button>
            {isFormOpen && <AddSong projectId={projectId} />}

            <h4>Songs:</h4>
            {songs && songs.length > 0 ? (
                <ul>
                    {songs.map((song) => (
                        <li key={song.songId}>{song.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No songs found</p>
            )}


        </div>
    );
};

export default MusicDetail;
