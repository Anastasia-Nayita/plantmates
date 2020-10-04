import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // bio: this.props.bio,
            showTextArea: false,
            error: false,
        };
        // console.log("props in Bio", this.props);
        // console.log("state in Bio", this.state);
    }

    handleChange(e) {
        this.setState(
            {
                bio: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
        // }
    }

    showBioBlock(e) {
        e.preventDefault();
        this.setState({ showTextArea: true });
    }

    updateBio(e) {
        e.preventDefault();
        const newBio = {
            bio: this.state.bio,
        };
        axios
            .post("/editbio", newBio)
            .then(({ data }) => {
                if (data.error) {
                    this.setState({ data });
                } else {
                    this.setState(
                        {
                            ...data,
                            showTextArea: false,
                        },
                        () => this.props.setBio(this.state.bio)
                    );
                }
            })
            .catch((err) => {
                this.setState({ error: true });
                console.log("err: ", error);
            });
    }

    // - [ ] show current bio
    // - [ ] onClick (button) edit bio
    // - [ ] call function to pass and save new bio
    // - [ ] conditionally show buttons
    //   (1Add- if there is no bio, 2Edit- if there is bio, 3Save- to save edited bio)

    render() {
        return (
            <div className="bio-block">
                <p>{!this.state.showTextArea && this.props.bio}</p>

                {this.props.bio ? (
                    <button onClick={(e) => this.showBioBlock(e)}>edit</button>
                ) : (
                    <button onClick={(e) => this.showBioBlock(e)}>add</button>
                )}

                {this.state.showTextArea && (
                    <>
                        <textarea
                            className="bio-textarea"
                            onChange={(e) => this.handleChange(e)}
                            defaultValue={this.props.bio}
                        ></textarea>

                        <button onClick={(e) => this.updateBio(e)}>save</button>
                    </>
                )}
            </div>
        );
    }
}
