import React from "react";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        this.setState(
            {
                first: e.target.value,
                last: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    // this code will redirect the user to the / route...
    // location.replace('/')

    render() {
        return (
            <div>
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
                <label htmlFor="last">enter your last name:</label>
                <input
                    onChange={(e) => this.handleChange(e)}
                    name="last"
                    placeholder="last name"
                />
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
                <button>REGISTER</button>
                <h3>
                    Already a member? <a href="/login">Log in</a>
                </h3>
            </div>
        );
    }
}
