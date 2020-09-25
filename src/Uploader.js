import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios.js";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleClick(e) {
        e.preventDefault();
        var that = this;
        axios
            .post("/uploader", that.state)
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
                <h2>Want to change your image?</h2>
                <button onClick={(e) => this.handleClick(e)}>Upload</button>
            </div>
        );
    }
}
