import React, { useContext, useState } from 'react';
import { createProject } from '../../services/api';
import { AuthContext } from "../../context/AuthContext";

const AddProject = () => {
    const [projectName, setProjectName] = useState('');
    const [projectArtist, setProjectArtist] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext); // use context to get the user

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleProjectArtistChange = (e) => {
        setProjectArtist(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const project = {
                projectName: projectName,
                projectArtist: projectArtist,
                userId: user.id,  // access user.id directly from the user object
            };

            const createdProject = await createProject(user.id, project);

            console.log('Created project:', createdProject);
            // Handle success or perform any additional actions

            setProjectName('');
            setProjectArtist('');

            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            // Handle error or display error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Add Project</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="projectName">Project Name:</label>
                    <input
                        type="text"
                        id="projectName"
                        value={projectName}
                        onChange={handleProjectNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="projectArtist">Project Artist:</label>
                    <input
                        type="text"
                        id="projectArtist"
                        value={projectArtist}
                        onChange={handleProjectArtistChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Project'}
                </button>
            </form>
        </div>
    );
};

export default AddProject;
