import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserById } from '../services/api';

function Profile() {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (user && user.id && user.token) {
                const userData = await getUserById(user.id, user.token);
                // Handle the user data
                setUserData(userData);
            }
        };

        fetchUser();
    }, [user]);

    if (!user || !userData) {
        // Optional: Show a loading indicator or redirect to login
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <h2>Name: {user.firstname} {user.lastname}</h2>
        </div>
    );
}

export default Profile;