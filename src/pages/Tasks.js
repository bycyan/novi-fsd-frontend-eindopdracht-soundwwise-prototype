import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Tasks() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Tasks</h1>
            {user ? (
                <div>
                        <div>
                            {user.tasks.map((task) => (
                                <div key={task.id}>
                                    <p>{task.taskName}</p>
                                    <p>{task.dueDate}</p>
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