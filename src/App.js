import React from "react";
import axios from "./axios";
import Profilepic from "./Profilepic.js";
import Uploader from "./Uploader.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) =>
            this.setState({
                ...data,
                image: data.image || "/default.png",
            })
        );
    }

    render() {
        return (
            <div>
                <div className="Logo">
                    <img src="./fpclogo.gif" alt=""></img>
                </div>
                <Profilepic
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.image}
                    bio={this.state.bio}
                    clickHandler={() =>
                        this.setState({ uploaderIsVisible: true })
                    }
                />

                {this.state.uploaderIsVisible && <Uploader />}
            </div>
        );
    }
}
