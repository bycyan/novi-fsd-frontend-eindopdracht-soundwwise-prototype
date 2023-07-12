import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Posts() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Posts</h1>
            {user ? (
                <div>
                    <div>
                        {user.posts.map((post) => (
                            <div key={post.id}>
                                <p>{post.content}</p>
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

export default Posts;