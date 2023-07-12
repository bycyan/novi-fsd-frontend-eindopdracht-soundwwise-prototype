import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
// import "./Nav.css";
// import {Link, useNavigate} from "react-router-dom";
//
// import navProfile from "../assets/menu-icons/nav-profile.svg";
// import navPosts from "../assets/menu-icons/nav-posts.svg";
// import navPlus from "../assets/menu-icons/nav-plus.svg";
// import navTasks from "../assets/menu-icons/nav-tasks.svg";
// import navMusic from "../assets/menu-icons/nav-music.svg";
// import navPlusActive from "../assets/menu-icons/nav-plus-active.svg";

function Nav() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isActive, setIsActive] = useState(false); // Active state

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        setIsActive(!isActive); // Toggle active state
    };

    const closeMenu = () => {
        setMenuVisible(false);
        setIsActive(false); // Toggle active state
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic here
        // ...

        // Redirect to the "/" route
        navigate('/');
    };

    return (
        <nav>
            <div className="navbar">
                <Link to="/profile">
                    <div onClick={closeMenu}>
                        <div className="nav-bttn" >
                            {/*<img src={navProfile}/>*/}
                        </div>
                        <p>profile</p>
                    </div>
                </Link>

                <Link to="/posts">
                    <div onClick={closeMenu}>
                        {/*<div className="nav-bttn">*/}
                        {/*    <img src={navPosts}/>*/}
                        {/*</div>*/}
                        <p>posts</p>
                    </div>
                </Link>

                {/*<button*/}
                {/*    className={`nav-bttn nav-plus ${isActive ? "active" : ""}`}*/}
                {/*    onClick={toggleMenu}*/}
                {/*>*/}
                {/*    <img*/}
                {/*        src={isActive ? navPlusActive : navPlus}*/}
                {/*        alt="Toggle Menu"*/}
                {/*    />*/}
                {/*</button>*/}

                {/*{menuVisible && (*/}
                {/*    <div className="overlay">*/}
                {/*        <div className="menu-overflow">*/}

                {/*            <div className="flex-container profile-menu-items">*/}

                {/*                <div className="flex-container">*/}
                {/*                    <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="profile-img" />*/}

                {/*                    <div>*/}
                {/*                        <h5>Cyan Dalebout</h5>*/}
                {/*                        <a href="" onClick={handleLogout}><h6>log out</h6></a>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                <h6>Settings</h6>*/}

                {/*            </div>*/}

                {/*            <div className="main-menu-items">*/}
                {/*                <h4 >add task</h4>*/}
                {/*                <h4><a href="/">add music</a></h4>*/}
                {/*                <h4>add post</h4>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}


                <Link to="/tasks">
                    <div onClick={closeMenu}>
                        {/*<div className="nav-bttn">*/}
                        {/*    <img src={navTasks}/>*/}
                        {/*</div>*/}
                        <p>tasks</p>
                    </div>
                </Link>
                <Link to="/music">
                    <div onClick={closeMenu}>
                        {/*<div className="nav-bttn">*/}
                        {/*    <img src={navMusic}/>*/}
                        {/*</div>*/}
                        <p>music</p>
                    </div>
                </Link>

            </div>

        </nav>
    );
}

export default Nav;