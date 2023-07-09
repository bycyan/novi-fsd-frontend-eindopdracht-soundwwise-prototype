import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Profile() {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const BASE_URL = 'http://localhost:8080';
        const userId = '1';

        const fetchUser = async () => {
            try {
                if (user && user.token) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    };
                    const response = await axios.get(`${BASE_URL}/users/${userId}`, config);
                    setUserData(response.data); // Store the user data in state
                    console.log(response.data);
                }
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    console.log("Rendering..")

    return (
        <div>
            <h1>Welcome, {userData && userData.firstName} {userData && userData.lastName}!</h1>
            {/* Display other user information as needed */}

        </div>
    );
}

export default Profile;