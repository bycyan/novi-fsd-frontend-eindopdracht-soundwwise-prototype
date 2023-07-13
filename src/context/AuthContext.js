import React, {createContext, useEffect, useState} from 'react';
import {getUserById, loginUser, updateUser} from "../services/api";
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
            console.log("Checking authentication...");

            //Retrieve authentication token from the localStorage
            const token = localStorage.getItem('authToken');
            // console.log("Token in localStorage:", token);

            if (token && location.pathname !== '/') { // Do not authenticate if we are on the home page
                console.log("Token found:", token);
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

    function login(JWT) {
        loginUser(JWT)
            .then((token) => {
                if (token) {
                    localStorage.setItem('authToken', JWT);
                } else {
                    console.log('Gebruiker is niet ingelogd!');
                }
            }
        );
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

    // function update(JWT) {
    //     updateUser(JWT)
    //         .then((response) => {
    //             if (response) {
    //                 localStorage.setItem('authToken', JWT);
    //             } else {
    //                 console.log('Gebruiker is niet aangepast!');
    //             }
    //         })
    //         .catch((error) => {
    //             console.log('Error:', error);
    //         });
    // }

    function update(userId, updatedUser) {
        const token = localStorage.getItem('authToken');
        if (token) {
            return updateUser(userId, updatedUser, token);
        } else {
            throw new Error('Authentication token not found.');
        }
    }




    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
        update: update,
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, contextData }}>
            {/*{children}*/}
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};
