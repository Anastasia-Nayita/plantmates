import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

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
            <div className="burger-menu" onClick={toggleModal}>
                {/* <div
                className={click ? "close-menu" : "burger-menu"}
                onClick={(toggleModal, handleClick)}
            > */}
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="Navbar"
                    className="nav-module"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}
                >
                    <div className="navbar">
                        <div className="navbar-container">
                            <ul className="nav-menu">
                                {/* <ul className={click ? "nav-menu active" : "nav-menu"}> */}
                                <li className="nav-item">
                                    <Link to="/" className="nav-links">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-links" href="/logout">
                                        Logout
                                    </a>
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
                                <li className="nav-item">
                                    <Link to="/chat" className="nav-links">
                                        Chat
                                    </Link>
                                </li>
                            </ul>
                            {profilepic}
                            {/* //Not working !<Profilepic /> */}
                        </div>
                    </div>

                    <div className="close-menu" onClick={toggleModal}></div>
                </Modal>
            </div>
        </div>
    );
}
