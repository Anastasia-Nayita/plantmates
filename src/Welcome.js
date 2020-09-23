import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Logo from "./Logo";
import NextPage from "./NextPage";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <Logo></Logo>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    {/* <Route path="/register" component={Registration} /> */}
                    <Route path="/login" component={Login} />
                    <Route path="/nextpage" component={NextPage} />
                </div>
            </HashRouter>
        </div>
    );
}
