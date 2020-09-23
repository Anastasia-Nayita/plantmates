import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios.js";
// import NextPage from "./NextPage";

export default class Login extends React.Component {
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
        var that = this;
        axios
            .post("/register", that.state)
            .then(function (response) {
                console.log("response: ", response);
            })
            .catch(function (error) {
                console.log("error: ", error);
            });
    }

    render() {
        return (
            <div>
                <h2>Login here: </h2>
                {this.state.error && (
                    <p className="error">something went wrong!</p>
                )}
                <label htmlFor="email">enter your email:</label>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="email"
                    placeholder="email"
                />
                <label htmlFor="password">enter your password:</label>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="password"
                    type="password"
                    placeholder="password"
                />
                <button onClick={(e) => this.handleClick(e)}>LOG IN</button>

                <h3>
                    <Link to="/register">Click here to register!</Link>
                </h3>
            </div>
        );
    }
}
