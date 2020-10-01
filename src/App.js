import React from "react";
import axios from "./axios";
import Profile from "./Profile.js";
import Uploader from "./Uploader.js";
import Profilepic from "./Profilepic.js";
import BioEditor from "./BioEditor.js";
import OtherProfile from "./OtherProfile";
// import Registration from "./Registration";
// import Login from "./Login";
// import ResetPassword from "./ResetPassword";
// import Logout from "./Logout";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            uploaderIsVisible: false,
        };
        this.setBio = this.setBio.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            var defaultBio = "no added bio yet...";
            this.setState({
                ...data,
                ///////Maybe issue is here in naming
                image_url: data.image_url || "./default.png", ///"/https://picsum.photos/150"
                bio: data.bio || defaultBio,
            });
        });
        console.log("this.state : ", this.state);
    }

    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }
    clickHandler() {
        this.setState({
            uploaderIsVisible: true,
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar />
                    {/* <Switch> */}
                    {/* <Route path="/login" component={Login} /> */}

                    {/* <Route path="/register" component={Registration} /> */}
                    {/* <Route path="/" component={Profile} /> */}
                    {/* <Route
                            path="/password/reset"
                            component={ResetPassword}
                        />
                        <Route path="/logout" component={Logout} /> */}
                    {/* {/* <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )} */}
                    {/* /> */}
                    {/* </Switch> */}
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                profilepic={
                                    <Profilepic
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        imageUrl={this.state.image_url}
                                        clickHandler={() =>
                                            this.setState({
                                                uploaderIsVisible: true,
                                            })
                                        }
                                    />
                                }
                                bioEditor={
                                    <BioEditor
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                    />
                                }
                            />
                        )}
                    />
                    {/* <Route path="/user/:id" component={OtherProfile} /> */}
                </Router>
                <div className="Logo">
                    <img
                        className="LogoImg"
                        src="https://media.giphy.com/media/l0OWjOSGaUjQvzBGE/giphy.gif"
                        alt="Logo"
                    />

                    <h2> hey stranger </h2>
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        addImage={(newImage) => {
                            console.log("newImage: ", newImage);
                            this.setState({
                                image_url: newImage,
                                uploaderIsVisible: false,
                            });
                        }}
                    />
                )}
            </div>
        );
    }
}
