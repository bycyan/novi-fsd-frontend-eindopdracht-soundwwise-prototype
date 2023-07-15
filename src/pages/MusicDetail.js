import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {getProjectById, getAllSongs} from '../services/api';
import { useParams } from 'react-router-dom';
import AddSong from "../components/forms/AddSong";
import "./MusicDetail.css";

const MusicDetail = () => {
    // const { user } = useContext(AuthContext);
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // console.log('User:', user);

    // useEffect(() => {
    //     const fetchProject = async () => {
    //         try {
    //             const response = await getProjectById(projectId);
    //             setProject(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.log('Error:', error);
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchProject();
    // }, [projectId]);
    //
    // useEffect(() => {
    //     const fetchSongs = async () => {
    //         try {
    //             const token = localStorage.getItem('authToken');
    //             const response = await getAllSongs(projectId, token);
    //             console.log('Fetched songs:', response.data);
    //             setSongs(response.data);
    //         } catch (error) {
    //             console.log('Error:', error);
    //         }
    //     };
    //
    //     fetchSongs();
    // }, [projectId]);

    useEffect(() => {
        const fetchProjectAndSongs = async () => {
            try {
                const response = await getProjectById(projectId);
                setProject(response.data);
                setSongs(response.data.songItems); // Extract songItems from the project data
                setLoading(false);
            } catch (error) {
                console.log('Error:', error);
                setLoading(false);
            }
        };

        fetchProjectAndSongs();
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

            <div className="backdrop">
                <div className="music-detail-nav">
                    <section className="flex-container upper-nav">
                        {/* eslint-disable-next-line no-restricted-globals */}
                        <button onClick={() => history.go(-1)}>Go Back</button>
                        <button onClick={openForm}>Add Song</button>
                    </section>
                </div>
            </div>
            <div className="music-detail-cover-img">
                <img
                    src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/06/fdcd5a_d8dd6d540bd84e4e9df8cbcfa376ce0dmv2.jpg?resize=1000%2C1000&ssl=1"
                    alt=""
                />
            </div>
            <div>
                <div className="music-cover-img">
                    {/*<div>*/}
                    {/*    <h1>My Component</h1>*/}
                    {/*    <UploadButton onUpload={handleUpload} />*/}
                    {/*</div>*/}
                    <img
                        src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/06/fdcd5a_d8dd6d540bd84e4e9df8cbcfa376ce0dmv2.jpg?resize=1000%2C1000&ssl=1"
                        alt=""
                    />
                </div>

                <section className="transparent-container music-detail-header-section">
                    <h5>Project Name: {projectName}</h5>
                    <h6>Artist: {projectArtist}</h6>
                </section>
            </div>


            <section className="outer-container">
            <h5>songs</h5>
            {songs && songs.length > 0 ? (
                <ul>
                    {songs.map((song) => (
                        <li key={song.title}>{song.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No songs found</p>
            )}
            </section>

            {isFormOpen && <AddSong projectId={projectId} />}

        </div>


    );
};

export default MusicDetail;
