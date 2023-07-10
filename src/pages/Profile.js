import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { fetchUser } from '../context/UserContext';

function Profile() {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const userId = '1'; // Replace '1' with the actual user ID
        fetchUser(userId, setUser);
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    console.log('Rendering..');
    console.log(user)

    return (
        <div>
            <h1>Welcome, {user.firstName} {user.lastName}!</h1>
            {/* Display other user information as needed */}
        </div>
    );
}

export default Profile;
