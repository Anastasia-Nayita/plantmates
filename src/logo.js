import React from "react";

export default class Logo extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    render() {
        return (
            <div>
                <img src="./fpclogo.gif" alt=""></img>
            </div>
        );
    }
}
