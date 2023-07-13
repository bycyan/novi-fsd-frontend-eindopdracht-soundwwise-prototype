import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../services/api';

const MusicDetail = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <p>Loading project details...</p>;
    }

    if (!project) {
        return <p>Project not found</p>;
    }

    const {
        projectName,
        projectArtist,
        projectImage,
        contributors,
        fileItems,
        songItems,
    } = project;

    return (
        <div>
            <h1>Music Detail</h1>
            <h3>Project Name: {projectName}</h3>
            <p>Artist: {projectArtist}</p>
            <img src={projectImage} alt="Project" />
            <h4>Contributors:</h4>
            <ul>
                {contributors.map((contributor, index) => (
                    <li key={index}>{contributor}</li>
                ))}
            </ul>
            <h4>Files:</h4>
            <ul>
                {fileItems.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
            <h4>Songs:</h4>
            <ul>
                {songItems.map((song, index) => (
                    <li key={index}>{song.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default MusicDetail;
