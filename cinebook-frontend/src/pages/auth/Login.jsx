import React, { useState } from "react";
import { loginUser } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/user/Login.css";

const Login = () => {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();


 //handle the input

    const handleChange = (e) => {

        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });

    };


   ///login button function

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(login);

            console.log(response.data);


            // Save JWT token

            localStorage.setItem(
                "token",
                response.data.token
            );


            // Save email

            localStorage.setItem(
                "email",
                response.data.email
            );


            // Save role

            localStorage.setItem(
                "role",
                response.data.role
            );
            const data=response.data;
      alert("Login Successful");
            if(data.role==="ROLE_ADMIN"){
                navigate("/admin");
            }else{
                navigate("/");
            }

         

            


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Invalid Email or Password"
            );

        }

    };


    return (

        <div className="cine-login-page">


            {/* 
                Background 
           */}

            <div className="cine-login-background"></div>


            <div className="cine-login-overlay"></div>


            {/*
                Login Container
          */}

            <div className="container cine-login-container">

                <div className="row justify-content-center">

                    <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">


                        {/*
                            Login Card
                    */}

                        <div className="cine-login-card">


                            {/* Logo */}

                            <div className="cine-login-logo">

                                <span>
                                    🎬
                                </span>

                                Book Movie

                            </div>


                            {/* Heading */}

                            <h1>
                                Welcome Back
                            </h1>

                            <p className="cine-login-subtitle">
                                Login to continue your movie journey
                            </p>


                            {/* 
                                Form  for login
                         */}

                            <form onSubmit={handleSubmit}>


                                {/* Email*/}

                                <div className="cine-input-group">

                                    <label>
                                        Email Address
                                    </label>

                                    <div className="cine-input-wrapper">

                                        <span>
                                            ✉
                                        </span>

                                        <input
                                            type="email"
                                            name="email"
                                            value={login.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* Password */}

                                <div className="cine-input-group">

                                    <label>
                                        Password
                                    </label>

                                    <div className="cine-input-wrapper">

                                        <span>
                                            🔒
                                        </span>

                                        <input
                                            type="password"
                                            name="password"
                                            value={login.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* Forgot password */}

                                <div className="cine-login-options">

                                    <span></span>

                                    <Link to="/forgot-password">
                                        Forgot Password?
                                    </Link>

                                </div>


                                {/* Login button */}

                                <button
                                    type="submit"
                                    className="cine-login-button"
                                >

                                    Login to CineBook

                                </button>


                            </form>


                            {/* Divider */}

                            <div className="cine-divider">

                                <span>
                                    OR
                                </span>

                            </div>


                            {/* Register */}

                            <p className="cine-register-text">

                                Don't have an account?

                                <Link to="/register">
                                    Create Account
                                </Link>

                            </p>


                            {/* Security */}

                            <div className="cine-login-security">

                                🔒 Secure & encrypted login

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Login;

