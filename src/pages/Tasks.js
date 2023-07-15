import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import AddTask from '../components/forms/AddTask';
import {deleteTask} from "../services/api";
import "./Tasks.css"
import Checked from "../assests/checked.svg";

function Tasks() {
    const { user, setUser } = useContext(AuthContext);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    const openForm = () => {
        setIsFormOpen(true);
    };

    const handleTaskComplete = async (taskId) => {
        try {
            const token = localStorage.getItem('authToken');
            await deleteTask(taskId, token);
            setIsChecked((prevState) => !prevState);

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
        <div className="container">
            {user ? (
                <div className="tasks-container">
                    <div>
                        <section className="outer-container">
                            <div className="flex-container tasks">
                                <div className="new-task-button">
                                    <h6 onClick={openForm}>+ new task</h6>
                                </div>
                                <div className="task-filter">
                                    {/*<img src={filter} alt="" />*/}
                                </div>
                            </div>
                        </section>


                        {[...user.tasks].reverse().map((task) => (
                            <div key={task.taskId}>
                                <section className="outer-container">
                                    <div className="flex-container task-item">
                                        <div>
                                            <h5>{task.name}</h5>
                                            <p>Due date: {task.dueDate}</p>
                                        </div>
                                        <label className="checkbox-container">
                                            <input

                                                type="checkbox"
                                                id={`checkbox-${task.taskId}`} // Unique identifier for each checkbox
                                                checked={task.isComplete || false} // Set to false if undefined
                                                onChange={() => handleTaskComplete(task.taskId)}
                                            />
                                            <span className={`checkbox-custom ${isChecked ? 'checked' : ''}`}>
                                                {isChecked && <img src={Checked} alt="" />}
                                            </span>
                                        </label>
                                    </div>
                                </section>

                            </div>
                        ))}
                    </div>

                    {isFormOpen && <AddTask />} {/* Render the AddTask component */}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Tasks;
