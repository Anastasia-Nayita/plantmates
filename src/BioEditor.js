import React from "react";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: this.state.bio,
            editBio: this.state.editBio,
            // setBio=this.setBio,
            error: false,
        };
    }

    render() {
        return <div className="bio-block">{bio}</div>;
    }
}
