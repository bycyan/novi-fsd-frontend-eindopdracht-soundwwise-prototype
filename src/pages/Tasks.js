import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import AddTask from '../components/forms/AddTask';
import {deleteTask, updateTask, updateUser} from "../services/api";

function Tasks() {
    const { user, setUser } = useContext(AuthContext);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => {
        setIsFormOpen(true);
    };

    const handleTaskComplete = async (taskId) => {
        try {
            const token = localStorage.getItem('authToken');
            await deleteTask(taskId, token);

            setUser((prevUser) => ({
                ...prevUser,
                tasks: prevUser.tasks.filter((task) => task.taskId !== taskId),
            }));
        } catch (error) {
            console.log('Error:', error);
            // Handle error condition
        }
    };

    return (
        <div>
            <h1>Tasks</h1>
            {user ? (
                <div>
                    <div>
                        {[...user.tasks].reverse().map((task) => (
                            <div key={task.taskId}>
                                <div>
                                    <h5>{task.taskName}</h5>
                                    <p>Due date: {task.dueDate}</p>
                                </div>
                                <label>
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${task.taskId}`} // Unique identifier for each checkbox
                                        checked={task.isComplete || false} // Set to false if undefined
                                        onChange={() => handleTaskComplete(task.taskId)}
                                    />
                                    Complete
                                </label>
                            </div>
                        ))}
                    </div>
                    <button onClick={openForm}>Add</button>
                    {isFormOpen && <AddTask />} {/* Render the AddTask component */}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Tasks;
