import React from "react";

export default class logo extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    render() {
        return (
            <div>
                <img href="/public/fpclogo.gif" />
            </div>
        );
    }
}
