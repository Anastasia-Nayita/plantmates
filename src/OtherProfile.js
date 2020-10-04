import React from "react";
import axios from "./axios.js";
import Friendbtn from "./Friendbtn";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    componentDidMount() {
        axios
            .get("/api/user/" + this.props.match.params.id)
            .then(({ data }) => {
                if (data.loggedId === data.id || data.error) {
                    this.props.history.push("/");
                } else {
                    this.setState(data);
                }
            })
            .catch((err) => {
                console.log("err in axios componentMount: ", err);
            });
    }

    render() {
        const { first, last, bio, image_url } = this.state;
        return (
            <div className="profile-info">
                <h2>this is the Other</h2>
                <div className="bigger">
                    <img
                        className="profilepic"
                        src={image_url}
                        alt={`{first} {last}`}
                    />
                    <Friendbtn />
                </div>
                <p>
                    {first} {last}
                </p>
                <p>{bio}</p>
            </div>
        );
    }
}
