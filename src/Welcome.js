import React from "react";
import Registration from "./Registration";
import logo from "./logo";

export default function Welcome() {
    return (
        <React.Fragment>
            <h1> Welcome to my socialnetwork</h1>
            <logo />
            <Registration />
        </React.Fragment>
    );
}
