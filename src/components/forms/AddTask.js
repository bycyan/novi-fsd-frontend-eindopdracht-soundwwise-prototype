import React, { useContext, useState } from 'react';
import { createTask } from '../../services/api';
import { AuthContext } from "../../context/AuthContext";

const AddTask = () => {
    const [taskName, setTaskName] = useState('');
    const [loading, setLoading] = useState(false);
    const [dueDate, setDueDate] = useState('');

    const { user } = useContext(AuthContext); // use context to get the user

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const task = {
                taskName: taskName,
                dueDate: new Date(dueDate),
                userId: user.id,  // access user.id directly from the user object
            };

            const createdTask = await createTask(user.id, task);

            console.log('Created task:', createdTask);
            // Handle success or perform any additional actions

            setTaskName('');
            setDueDate('');
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
            <h1>Add Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        type="text"
                        id="taskName"
                        value={taskName}
                        onChange={handleTaskNameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={handleDueDateChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Task'}
                </button>
            </form>
        </div>
    );

}

export default AddTask;