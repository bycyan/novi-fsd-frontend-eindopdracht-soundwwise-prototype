import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Tasks() {
    const { user } = useContext(AuthContext);

    //Fetch tasks

    //functions
    //Task add
    //Task delete
    //Task complete


    return (
        <div>
            <h1>Tasks</h1>
            {user ? (
                <div>
                        <div>
                            {user.tasks.map((task) => (
                                <div key={task.id}>
                                    <div>
                                        <h5>{task.taskName}</h5>
                                        <p>Due date: {task.dueDate}</p>
                                    </div>
                                    <p>{task.complete}</p>
                                </div>
                            ))}
                        </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Tasks;