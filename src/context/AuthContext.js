import React, {createContext, useEffect, useState} from 'react';
import {getUserById, loginUser, validateToken} from "../services/api";
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

                //If token is found, call the validateToken
                // const response = await validateToken(token);
                // console.log('Response from token:', response); // For debugging
                // //Decode the JWT
                // const decodedToken = jwt_decode(token);
                //
                // console.log('Decoded Token:', decodedToken); // Add this console.log statement
                // //If response is not null, set the user
                // if (response?.data && decodedToken && decodedToken.user) {
                //     //
                //     console.log('Response Data:', response.data);
                //     console.log('Decoded Token:', decodedToken);
                //     const userId = decodedToken.user.id;
                //     console.log('User ID:', userId);
                //     const userFromGetUserById = await getUserById(userId, token);
                //     console.log('User from getUserById:', userFromGetUserById);
                //     const finalUser = userFromGetUserById || decodedToken.user;
                //     console.log('Final User:', finalUser);
                //
                //     // const userId = decodedToken.user.id;
                //     // const userFromGetUserById = await getUserById(userId, token);
                //     // const finalUser = userFromGetUserById || decodedToken.user;

            //         setUser(finalUser);
            //         setIsAuth({
            //             isAuth: true,
            //             user: finalUser,
            //             status: 'done',
            //         });
            //
            //     } else {
            //         console.log("User not set");
            //     }
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
    ////


    // function login(JWT) {
    //     localStorage.setItem('authToken', JWT);
    // }

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

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, contextData }}>
            {children}
            {/*{isAuth.status === 'done' ? children : <p>Loading...</p>}*/}
        </AuthContext.Provider>
    );
};
