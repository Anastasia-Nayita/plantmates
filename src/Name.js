import React from "react";
import axios from "axios";
export default class Name extends React.Component {
    constructor() {
        super();
        this.state = {
            cohort: "cumin",
            name: "Naya",
        };
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                <p> welcom {this.state.cohort}</p>
            </div>
        );
    }
}
