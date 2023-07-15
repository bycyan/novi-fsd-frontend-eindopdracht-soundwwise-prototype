import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import "./Posts.css";

function Posts() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {user ? (
                <div>
                    <article className="outer-container">

                        <div className="post-content">
                            <h5>{user.firstName} {user.lastName}</h5>
                            <h6>sunday 20/13/2023</h6>
                            <p className="subtitle">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem delectus dicta facere laboriosam maiores molestias quis similique unde voluptas! Alias aliquid assumenda beatae doloremque et expedita id impedit inventore ipsa minus modi natus necessitatibus odio pariatur, placeat quaerat qui quia repellat sunt temporibus, tenetur totam vitae. Cupiditate error, neque.
                            </p>
                        </div>

                        <div className="flex-container interact">
                            <div className="flex-container like"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/640px-Love_Heart_symbol.svg.png" alt=""/><h6>like</h6></div>
                        </div>

                    </article>
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