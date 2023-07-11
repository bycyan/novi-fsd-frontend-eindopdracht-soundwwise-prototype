import React, {createContext, useEffect, useState} from 'react';
import {getUserById, loginUser} from "../services/api";
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const checkAuthentication = async () => {

            //Retrieve authentication token from the localStorage
            const token = localStorage.getItem('authToken');
            if (token) {
                //If token is found, call the loginUser
                const response = await loginUser(token);
                //Decode the JWT
                const decodedToken = jwt_decode(token);

                // await getUserById(response.sub, token);
                //If response is not null, set the user
                if (response && decodedToken && decodedToken.user) {
                    const userId = response.sub;
                    const userFromGetUserById = await getUserById(userId, token);
                    const finalUser = userFromGetUserById || decodedToken.user;

                    setUser(finalUser);
                    setIsAuth({
                        isAuth: true,
                        user: finalUser,
                        status: 'done',
                    });
                }
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
    } , []);

    function login(JWT) {
        localStorage.setItem('authToken', JWT);
    }

      function logout() {
        localStorage.clear();
        setIsAuth({
          isAuth: false,
          user: null,
          status: 'done',
        });

        console.log('Gebruiker is uitgelogd!');
        // history.push('/');
      }

    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={{ login, logout, contextData }}>
            {children}
            {/*{isAuth.status === 'done' ? children : <p>Loading...</p>}*/}
        </AuthContext.Provider>
    );
};
