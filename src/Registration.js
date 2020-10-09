import React from "react";
import { Link } from "react-router-dom";
//import { HashRouter, Link } from "react-router-dom";
import axios from "./axios.js";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
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

    handleClick(e) {
        e.preventDefault();
        // var that = this;
        axios
            .post("/register", this.state)
            .then(function (response) {
                console.log("response: ", response);
                if (response) {
                    // this.setState({
                    //     error: false,
                    // });
                    location.replace("/");
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
    }

    render() {
        return (
            <div id="welcome">
                <div className="block">
                    <h3>Register here:</h3>
                    {this.state.error && (
                        <p className="error">something went wrong!</p>
                    )}
                    <label htmlFor="first">enter your first name:</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="first"
                        placeholder="first name"
                    />
                    <br />
                    <label htmlFor="last">enter your last name:</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        placeholder="last name"
                    />
                    <br />
                    <label htmlFor="email">enter your email:</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        placeholder="email"
                    />
                    <br />
                    <label htmlFor="password">enter your password:</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <br />
                    <button onClick={(e) => this.handleClick(e)}>
                        REGISTER
                    </button>

                    <h3>
                        <Link to="/login">Click here to Log in!</Link>
                    </h3>
                </div>
            </div>
        );
    }
}
