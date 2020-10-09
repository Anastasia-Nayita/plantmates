import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import FeatherIcon from "feather-icons-react";

Modal.setAppElement("body");

export default function Navbar({ profilepic }) {
    // const [click, setClick] = useState(false);
    // const handleClick = () => setClick(!click);
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            {/* <FeatherIcon
                icon="menu"
                className="burger-menu"
                onClick={toggleModal}
            />
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="Navbar"
                className="nav-module"
                overlayClassName="myoverlay"
                closeTimeoutMS={500}
            > */}
            <div className="navbar">
                <div className="navbar-container">
                    <ul className="nav-menu">
                        {/* <ul className={click ? "nav-menu active" : "nav-menu"}> */}
                        <li className="nav-item">
                            <Link to="/" className="nav-links">
                                <FeatherIcon icon="home" />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-links" href="/logout">
                                <FeatherIcon icon="log-out" />
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-links">
                                <FeatherIcon icon="search" />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/friends" className="nav-links">
                                <FeatherIcon icon="users" />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/chat" className="nav-links">
                                <FeatherIcon icon="message-circle" />
                            </Link>
                        </li>
                    </ul>
                    {profilepic}
                </div>
            </div>
            {/* <div id="close-menu">
                    <FeatherIcon icon="x-circle" onClick={toggleModal} />
                </div>
            </Modal> */}
        </div>
    );
}
