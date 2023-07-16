import React from "react";
import "./UpperNav.css";
import Logo from "../assests/soundwwise-logo.png";
import {useLocation} from "react-router-dom";

export default function UpperNav() {

    const location = useLocation();
    const pathname = location.pathname;

    const getPageName = () => {
        // Manipulate the pathname as needed to extract the page name
        // For example, remove leading slashes and convert to title case
        return pathname.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, ' ');
    }

    return (
        <>
            <div className="upper-nav-back">
                <section className="flex-container upper-nav">
                    <h3>{getPageName()}</h3>
                    <img src={ Logo } alt="sw-logo"/>
                </section>
            </div>
        </>
    );
}