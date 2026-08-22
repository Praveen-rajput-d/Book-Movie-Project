// import React from 'react'

// const Footer = () => {
//   return (
// <footer className="bg-dark text-white text-center p-3 mt-5">
//     @2026 Cinebook | All Rights Reserved
// </footer>
//   )
// }

// export default Footer





import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {

    return (

        <footer className="cine-footer">

            <div className="container">

                <div className="footer-main">

                    {/* Brand */}

                    <div className="footer-brand">

                        <Link
                            to="/"
                            className="footer-logo"
                        >
                            Cine<span>Book</span>
                        </Link>

                        <p>
                            Your one-stop destination for
                            booking movie tickets online.
                        </p>

                    </div>


                    {/* Quick Links */}

                    <div className="footer-section">

                        <h5>
                            Quick Links
                        </h5>

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/movies">
                            Movies
                        </Link>

                        <Link to="/mybookings">
                            My Bookings
                        </Link>

                        <Link to="/my-tickets">
                            My Tickets
                        </Link>

                    </div>


                    {/* Support */}

                    <div className="footer-section">

                        <h5>
                            Support
                        </h5>

                        <a href="#">
                            Help Center
                        </a>

                        <a href="#">
                            Contact Us
                        </a>

                        <a href="#">
                            Terms & Conditions
                        </a>

                        <a href="#">
                            Privacy Policy
                        </a>

                    </div>


                    {/* Social */}

                    <div className="footer-section">

                        <h5>
                            Follow Us
                        </h5>

                        <div className="social-links">

                            <a href="#" aria-label="Facebook">
                                f
                            </a>

                            <a href="#" aria-label="Instagram">
                                ◎
                            </a>

                            <a href="#" aria-label="Twitter">
                                𝕏
                            </a>

                            <a href="#" aria-label="YouTube">
                                ▶
                            </a>

                        </div>

                        <p className="footer-social-text">
                            Stay connected with CineBook
                            for the latest movies and offers.
                        </p>

                    </div>

                </div>


                {/* Divider */}

                <div className="footer-divider"></div>


                {/* Bottom */}

                <div className="footer-bottom">

                    <p>
                        © 2026 CineBook. All Rights Reserved.
                    </p>

                    <p>
                        Made with ❤️ for movie lovers
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;

