import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserById} from "../services/api";

function Profile() {
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        const userId = setUser.userId;
        void getUserById(userId, setUser);
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    console.log(user.userId);
    console.log(user)

    return (
        <div>
            <h1>profile</h1>
            <p>{user.firstName} {user.lastName}</p>
        </div>
    );
}

export default Profile;
