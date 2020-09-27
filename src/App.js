import React from "react";
import axios from "./axios";
import Profile from "./Profile.js";
import Uploader from "./Uploader.js";
import Profilepic from "./Profilepic.js";
import BioEditor from "./BioEditor.js";

import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Logout from "./Logout";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState({
                ...data,
                image: data.image || "https://picsum.photos/150", ////change to default later
            });
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />

                        <Route path="/register" component={Registration} />
                        <Route path="/user" component={Profile} />
                        <Route
                            path="/password/reset"
                            component={ResetPassword}
                        />
                        <Route path="/logout" component={Logout} />
                    </Switch>
                </Router>

                <div className="Logo">
                    {/* <img src="./logo.gif" alt="Logo" /> */}
                    <img
                        className="LogoImg"
                        src="https://media.giphy.com/media/l0OWjOSGaUjQvzBGE/giphy.gif"
                        alt="Logo"
                    />

                    <h2> hey stranger </h2>
                </div>

                <div className="profile">
                    <Profile
                        first={this.state.first}
                        last={this.state.last}
                        profilepic={
                            <Profilepic
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                imageUrl={this.state.image}
                                clickHandler={() =>
                                    this.setState({ uploaderIsVisible: true })
                                }
                                ///  <div className={click ?  uploaderIsVisible: true  :  uploaderIsVisible: false} />
                            />
                        }
                        bioEditor={
                            <BioEditor
                                bio={this.state.bio}
                                setBio={this.setBio}
                            />
                        }
                    />
                </div>
                {this.state.uploaderIsVisible && (
                    <Uploader
                        addImage={(newImage) => {
                            this.setState({
                                image: newImage,
                                uploaderIsVisible: false,
                            });
                        }}
                    />
                )}
            </div>
        );
    }
}
