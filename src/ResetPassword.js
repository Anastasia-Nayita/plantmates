import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDisplay: 1,
            error: false,
        };
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState(
            {
                [name]: value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    handleEnterEmail(e) {
        e.preventDefault();
        const { name, value } = e.target;
        const { email } = this.state;
        if (email != "") {
            this.setState({
                [name]: value,
                error: false,
            });
            axios
                .post("/password/reset/start", this.state)
                .then((response) => {
                    console.log("response in start: ", response);
                    if (response) {
                        this.setState({ currentDisplay: 2 });
                    } else {
                        this.setState(
                            {
                                error: true,
                            },
                            () => console.log("this.state: ", this.state)
                        );
                    }
                })
                .catch(function (error) {
                    console.log("error: ", error);
                });
        } else {
            this.setState({
                error: true,
            });
        }
        //var that = this;
    }

    handleNewPsw(e) {
        e.preventDefault();
        const { name, value } = e.target;
        const { secretCode, email, password, confpassword } = this.state;
        if (
            email != "" &&
            password != "" &&
            secretCode != "" &&
            confpassword != 0 &&
            password === confpassword
        ) {
            this.setState({
                [name]: value,
                error: false,
            });
            axios
                .post("/password/reset/verify", this.state)
                .then((response) => {
                    console.log("response in verify: ", response);
                    if (response) {
                        this.setState({ currentDisplay: 3 });
                    } else {
                        this.setState(
                            {
                                error: true,
                            },
                            () => console.log("this.state: ", this.state)
                        );
                    }
                })
                .catch(function (error) {
                    console.log("error: ", error);
                });
        } else {
            this.setState({
                error: true,
            });
        }
    }

    render() {
        return (
            <div>
                <h2>Reset Password</h2>
                {this.state.currentDisplay == 1 && (
                    <div className="psw-reset">
                        <h3>
                            Please enter the email adress with which you
                            registred
                        </h3>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="email"
                            placeholder="email"
                            required
                        />

                        <br />
                        <button onClick={(e) => this.handleEnterEmail(e)}>
                            submit
                        </button>
                    </div>
                )}
                {this.state.currentDisplay == 2 && (
                    <div className="psw-reset">
                        <h3>Please enter the code you received</h3>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="secretCode"
                            placeholder="code"
                        />

                        <h3>Please enter your new password</h3>
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                        <input
                            onChange={(e) => this.handleChange(e)}
                            name="confpassword"
                            type="password"
                            placeholder="confirm password"
                        />
                        <br />
                        <button onClick={(e) => this.handleNewPsw(e)}>
                            confirm password
                        </button>
                    </div>
                )}

                {this.state.currentDisplay == 3 && (
                    <div className="psw-reset">
                        <h2>We did it!</h2>
                        <h3>
                            Now try to <Link to="/login">log in</Link> with new
                            password
                        </h3>
                    </div>
                )}
            </div>
        );
    }
}
