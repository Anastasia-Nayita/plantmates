import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profilepic from "./Profilepic.js";

export default function Navbar() {
    //profilepic/
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        This is nav bar
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <div className={click ? "burger-menu" : "close-menu"} />
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-links">
                                Log in
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-links">
                                Register
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/password/reset" className="nav-links">
                                Reset password
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-links">
                                Log out
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-links">
                                Find people
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/friends" className="nav-links">
                                Friends
                            </Link>
                        </li>
                    </ul>
                    {/* {profilepic}    Not working !      */}
                    <Profilepic />
                </div>
            </nav>
        </div>
    );
}
