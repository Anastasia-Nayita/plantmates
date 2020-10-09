import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import App from "./App";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome mate!</h1>
            <App />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    {/* <Route path="/register" component={Registration} /> */}
                    <Route path="/login" component={Login} />
                    <Route path="/password/reset" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
