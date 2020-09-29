import React from "react";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: this.props.bio,
            ///setBio: this.setBio,
            // setBio=this.setBio,

            error: false,
        };
        console.log("props in Bio", this.props);
        console.log("state in Bio", this.state);
    }

    AddButton() {
        return <button onClick={this.handleAddBi}>Add bio</button>;
    }

    // - [ ] show current bio
    // - [ ] onClick (button) edit bio
    // - [ ] call function to pass and save new bio
    // - [ ] conditionally show buttons
    //   (Add- if there is no bio, Edit- if there is bio, Save- to save edited bio)

    render() {
        return (
            <div className="bio-block">
                <h3>
                    {!this.props.bio ? (
                        <AddButton onClick={this.handleAddBio} />
                    ) : (
                        <EditButton onClick={this.handleEditBio} />
                    )}
                </h3>
            </div>
        );
    }
}
