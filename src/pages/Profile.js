import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserById} from "../services/api";

function Profile() {

    const { finalUser, setUser } = useContext(AuthContext);

    useEffect(() => {
        const userId = finalUser.userId;
        const token = localStorage.getItem('authToken');

        void getUserById(userId, token)
            .then((response) => {
                setUser(response);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }, []);

    return (
        <div>
            <h1>profile</h1>
            {/*<p>{user.firstName} {user.lastName}</p>*/}
        </div>
    );
}

export default Profile;
