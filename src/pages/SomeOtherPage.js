import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function SomeOtherPage() {
    const { user } = useContext(AuthContext);

    // Access the user object here
    console.log('User:', user);

    // Render the component based on the user object
    return (
        <div>
            <h1>Welcome to Some Other Page</h1>
            {user && (
                <div>
                    <p>User ID: {user?.userId}</p>
                    <p>User Name: {user?.name}</p>
                </div>
            )}
        </div>
    );
}

export default SomeOtherPage;
