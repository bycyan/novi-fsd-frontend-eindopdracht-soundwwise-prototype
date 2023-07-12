import React, {useContext, useState} from "react";
import { createUser, loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AuthForm() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [user, setUserCredentials] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const handleChange = (e) => {
        setUserCredentials({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleToggleForm = () => {
        setIsRegisterMode(!isRegisterMode);
    };

    const handleRegister = async () => {
        const newUser = await createUser(user);
        if (newUser) {
            console.log("New user created:", newUser);
            setUserCredentials({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
            });
            navigate("/", {
                state: { successMessage: "Registration successful! Please log in." },
            });
            return newUser;
        }
        return null;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //         if (isRegisterMode) {
    //             const registeredUser = await handleRegister();
    //             if (registeredUser) {
    //                 // Registration successful
    //                 // Perform any necessary actions
    //
    //                 // Call the loginUser function to authenticate the user
    //                 const response = await loginUser(user);
    //
    //                 // Handle successful login
    //                 if (response) {
    //                     // Call the login function to set the authentication token
    //                     // login(response.JWT);
    //                     login(response.JWT);
    //
    //                     // Perform any additional actions after successful login
    //                     // For example, navigate to a different page or update the state
    //                     // ...
    //
    //                     console.log('User logged in successfully!');
    //                 } else {
    //                     // Handle failed login
    //                     // ...
    //                     console.log('Login failed!');
    //                 }
    //             }
    //         } else {
    //             // Login mode
    //             // Call the loginUser function to authenticate the user
    //             const response = await loginUser(user);
    //
    //             // Handle successful login
    //             if (response) {
    //                 // Call the login function to set the authentication token
    //                 login(response.JWT);
    //
    //                 // Perform any additional actions after successful login
    //                 // For example, navigate to a different page or update the state
    //                 // ...
    //
    //                 console.log('User logged in successfully!');
    //                 console.log(response);
    //                 // navigate('/Profile');
    //             } else {
    //                 // Handle failed login
    //                 // ...
    //                 console.log('Login failed!');
    //             }
    //         }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isRegisterMode) {
            // Registration mode
            const registeredUser = await handleRegister();
            if (registeredUser) {
                // Registration successful
                // Perform any necessary actions

                // Call the loginUser function to authenticate the user
                const response = await loginUser(user);

                // Handle successful login
                if (response) {
                    // Perform any additional actions after successful login
                    // For example, navigate to a different page or update the state
                    // ...

                    console.log("User logged in successfully!");
                } else {
                    // Handle failed login
                    // ...
                    console.log("Login failed!");
                }
            }
        } else {
            // Login mode
            // Call the loginUser function to authenticate the user
            const response = await loginUser(user);

            // Handle successful login
            if (response) {
                // Perform any additional actions after successful login
                // For example, navigate to a different page or update the state
                // ...

                console.log("User logged in successfully!");
                console.log(response);

                // navigate('/Profile');
            } else {
                // Handle failed login
                // ...
                console.log("Login failed!");
            }
        }
    };




    return (
        <div>
            {isRegisterMode ? (
                <div className="container">
                    <h1>Create Account</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={user.firstname}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={user.lastname}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleChange}
                        />
                        <button type="submit">Create Account</button>

                        <p>
                            Already have an account?{" "}
                            <button type="button" onClick={handleToggleForm}>
                                Sign in
                            </button>
                        </p>
                    </form>
                </div>
            ) : (
                <>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleChange}
                        />
                        <button type="submit">Login</button>

                        <p>
                            Don't have an account?{" "}
                            <button type="button" onClick={handleToggleForm}>
                                Sign Up
                            </button>
                        </p>
                    </form>
                </>
            )}
        </div>
    );
}

export default AuthForm;
