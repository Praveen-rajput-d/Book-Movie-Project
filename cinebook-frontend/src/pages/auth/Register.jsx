// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../../services/authService";

// function Register() {
//   //usestate is used to store the data of the user
//  const [user, setUser] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//         phone: "",
//         roleId: 2
//     });
//   const navigate=useNavigate();

//     const handleChange = (e) => {
//         setUser({
//             ...user,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit=async(e)=>{
//       e.preventDefault();
//       try{
//         const response=await registerUser(user);
//         alert("Registration Successful!");
//         console.log(response.data);
//         navigate("/login");
//       }catch(error){
//         console.log(error);
//         alert("Registration Failed!");
//       }
//     };

    

           
//     return (
//        <div className="container mt-5">
//         <div  className="row justify-content-center">
//           <div className="col-md-6">
//             <div className="card shadow-lg border-0">
//               <div className="card-body p-4">
//                 <h2 className="text-center text-danger fw-bold mb-4">Create Account</h2>
             
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label className="form-label">First Name</label>
//                     <input type="text" className="form-control" placeholder="Enter First Name" name="firstName" value={user.firstName} onChange={handleChange}/>
//                   </div>

//                     <div className="mb-3">
//                     <label className="form-label">Last Name</label>
//                     <input type="text" className="form-control" placeholder="Enter Last Name" name="lastName" value={user.lastName} onChange={handleChange}/>
//                   </div>

//                     <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input type="email" className="form-control" placeholder="Enter Email" name="email" value={user.email} onChange={handleChange}/>
//                   </div>

//                     <div className="mb-3">
//                     <label className="form-label">Password</label>
//                     <input type="password" className="form-control" placeholder="Enter Password" name="password" value={user.password} onChange={handleChange}/>
//                   </div>

//                     <div className="mb-3">
//                     <label className="form-label">Phone Number</label>
//                     <input type="text" className="form-control" placeholder="Enter Phone Number" name="phone" value={user.phone} onChange={handleChange}/>
//                   </div>
//                   <button className="btn btn-danger w-100" type="submit">Register</button>
//                 </form>
//                 <hr/>
//                 <p className="text-center mb-0">Already have an account?
//                   <Link to="/login" className="ms-2 text-decoration-none">Login</Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//        </div>
//     );

// }

// export default Register;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

import "../../assets/styles/user/Register.css";


function Register() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        roleId: 2
    });

    const navigate = useNavigate();


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };


    // =====================================================
    // REGISTER
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await registerUser(user);

            console.log(response.data);

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration Failed!"
            );

        }

    };


    return (

        <div className="cine-register-page">


            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div className="cine-register-background"></div>

            <div className="cine-register-overlay"></div>


            {/* =================================================
                REGISTER CONTAINER
            ================================================= */}

            <div className="container cine-register-container">

                <div className="row justify-content-center">

                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">


                        {/* =================================================
                            REGISTER CARD
                        ================================================= */}

                        <div className="cine-register-card">


                            {/* Logo */}

                            <div className="cine-register-logo">

                                🎬 BookMovie

                            </div>


                            {/* Heading */}

                            <h1>
                                Create Account
                            </h1>

                            <p className="cine-register-subtitle">
                                Join CineBook and start booking your
                                favourite movies.
                            </p>


                            {/* =================================================
                                FORM
                            ================================================= */}

                            <form onSubmit={handleSubmit}>


                                {/* First + Last Name */}

                                <div className="row">


                                    <div className="col-md-6">

                                        <div className="cine-register-input">

                                            <label>
                                                First Name
                                            </label>

                                            <input
                                                type="text"
                                                name="firstName"
                                                value={user.firstName}
                                                onChange={handleChange}
                                                placeholder="First name"
                                                required
                                            />

                                        </div>

                                    </div>


                                    <div className="col-md-6">

                                        <div className="cine-register-input">

                                            <label>
                                                Last Name
                                            </label>

                                            <input
                                                type="text"
                                                name="lastName"
                                                value={user.lastName}
                                                onChange={handleChange}
                                                placeholder="Last name"
                                                required
                                            />

                                        </div>

                                    </div>


                                </div>


                                {/* Email */}

                                <div className="cine-register-input">

                                    <label>
                                        Email Address
                                    </label>

                                    <div className="cine-register-input-wrapper">

                                        <span>
                                            ✉
                                        </span>

                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* Password */}

                                <div className="cine-register-input">

                                    <label>
                                        Password
                                    </label>

                                    <div className="cine-register-input-wrapper">

                                        <span>
                                            🔒
                                        </span>

                                        <input
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                            placeholder="Create a password"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* Phone */}

                                <div className="cine-register-input">

                                    <label>
                                        Phone Number
                                    </label>

                                    <div className="cine-register-input-wrapper">

                                        <span>
                                            📱
                                        </span>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={user.phone}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* Register Button */}

                                <button
                                    type="submit"
                                    className="cine-register-button"
                                >

                                    Create CineBook Account

                                </button>


                            </form>


                            {/* Divider */}

                            <div className="cine-register-divider">

                                <span>
                                    ALREADY A MEMBER?
                                </span>

                            </div>


                            {/* Login */}

                            <p className="cine-login-text">

                                Already have an account?

                                <Link to="/login">
                                    Login
                                </Link>

                            </p>


                            {/* Security */}

                            <div className="cine-register-security">

                                🔒 Your information is securely protected

                            </div>


                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;

