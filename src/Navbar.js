import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

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
                            <Link
                                to="/"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/login"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Log in
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/register"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/user"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/password/reset"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Reset password
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/logout"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Log out
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
