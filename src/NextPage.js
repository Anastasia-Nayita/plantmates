import React from "react";

export default class NextPage extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    render() {
        return (
            <div>
                <h2>You arrived on the NEXT PAGE </h2>
                <br></br>
                <h3>we are all curious what's gonna be next</h3>
                {this.state.error && (
                    <p className="error">something went wrong!</p>
                )}
            </div>
        );
    }
}
