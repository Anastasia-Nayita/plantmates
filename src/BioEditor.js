import React from "react";
import axios from "./axios";
//import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import FeatherIcon from "feather-icons-react";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // bio: this.props.bio,
            showTextArea: false,
            showPicker: false,
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

    showPicker(e) {
        e.preventDefault();

        if (!this.state.showPicker) {
            this.setState({ showPicker: true });
        } else {
            this.setState({ showPicker: false });
        }
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

    addEmoji(e) {
        let emoji = e.native;
        this.setState({
            bio: this.state.bio + emoji,
        });
    }

    render() {
        return (
            <div className="bio-block">
                <p>{!this.state.showTextArea && this.props.bio}</p>

                {this.props.bio ? (
                    <button onClick={(e) => this.showBioBlock(e)}>
                        edit bio
                    </button>
                ) : (
                    <button onClick={(e) => this.showBioBlock(e)}>
                        add bio
                    </button>
                )}

                {this.state.showTextArea && (
                    <>
                        <textarea
                            className="bio-textarea"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.bio}
                            defaultValue={this.props.bio}
                            rows="4"
                            cols="60"
                        ></textarea>
                        <FeatherIcon
                            icon="smile"
                            onClick={(e) => this.showPicker(e)}
                        />

                        {this.state.showPicker && (
                            <span>
                                <Picker
                                    title="Pick your emoji…"
                                    emoji="point_up"
                                    style={{
                                        width: "316px",
                                        position: "absolute",
                                        bottom: "-246px",
                                        right: "95px",
                                    }}
                                    onSelect={(e) => this.addEmoji(e)}
                                    emojiSize={30}
                                    showPreview={false}
                                />
                            </span>
                        )}

                        <button onClick={(e) => this.updateBio(e)}>save</button>
                    </>
                )}
            </div>
        );
    }
}
