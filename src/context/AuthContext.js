import React, {createContext, useEffect, useState} from 'react';
import {getUserById, loginUser} from "../services/api";
import jwt_decode from 'jwt-decode';
import {useLocation} from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    const location = useLocation(); // Get current path

    useEffect(() => {
        const checkAuthentication = async () => {

            //Retrieve authentication token from the localStorage
            const token = localStorage.getItem('authToken');
            // console.log("Token in localStorage:", token);

            if (token && location.pathname !== '/') { // Do not authenticate if we are on the home page
                const decoded = jwt_decode(token);
                const userFromApi = await getUserById(decoded.sub, token);
                setUser(userFromApi); // Set the user state with the fetched user data

                setIsAuth({
                    isAuth: true,
                    user: userFromApi,
                    status: 'done',
                });
            }
            else {
                setIsAuth({
                    isAuth: false,
                    user: null,
                    status: 'done',
                });
            }
        }
        void checkAuthentication();
    } , [location.pathname]);

    // function login(JWT) {
    //     loginUser(JWT)
    //         .then((token) => {
    //             if (token) {
    //                 localStorage.setItem('authToken', JWT);
    //             } else {
    //                 console.log('Gebruiker is niet ingelogd!');
    //             }
    //         }
    //     );
    // }

    function login(JWT) {
        loginUser(JWT)
            .then(async (token) => {
                if (token) {
                    const decoded = jwt_decode(JWT);
                    const userFromApi = await getUserById(decoded.sub, JWT);
                    setUser({...userFromApi, token}); // Set the user state with the fetched user data and token
                    localStorage.setItem('authToken', JWT);
                } else {
                    console.log('Gebruiker is niet ingelogd!');
                }
            });
    }

    function logout() {
        localStorage.clear();
        setIsAuth({
          isAuth: false,
          user: null,
          status: 'done',
        });

        console.log('Gebruiker is uitgelogd!');
        //todo redirect to login page
      }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={{setUser, user, login, logout, contextData }}>
            {/*{children}*/}
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};
