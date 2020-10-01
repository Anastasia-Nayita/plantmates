////  get id from url
////  use this.props.match.params.id in ajax req to get it
////  add it to component state
//// bio of The Other wrapped in <p> and picture <img>

import React from "react";
import axios from "./axios.js";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            id: this.props.match.params.id,
        };
    }

    componentDidMount() {
        axios.get("/user/:id").then(({ data }) => {
            this.setState({
                ...data,
                // id: this.props.match.params.id,
            });
        });
        console.log("this.state /user/:id  : ", this.state);
    }

    render() {
        return (
            <div className="profile-info">
                <h2>this is the Other</h2>
            </div>
        );
    }
}
