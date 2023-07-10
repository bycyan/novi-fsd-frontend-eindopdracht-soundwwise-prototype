import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { fetchUser } from '../context/UserContext';

function Profile() {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const userId = '1';
        void fetchUser(userId, setUser);
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    console.log('Rendering..');
    console.log(user);

    return (
        <div>
            <h1>profile</h1>
            <p>{user.firstName} {user.lastName}</p>
        </div>
    );
}

export default Profile;
