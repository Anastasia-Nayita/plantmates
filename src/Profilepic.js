import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios.js";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }
}
