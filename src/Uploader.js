import React from "react";
import axios from "./axios.js";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: true,
            error: false,
        };
    }

    handleInput(e) {
        this.setState({
            file: e.target.files[0],
        });
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState(
            {
                [name]: value,
            },
            () => console.log("this.state: ", this.state)
        );
    }
    handleClick(e) {
        e.preventDefault();
        var formData = new FormData();
        if (!this.state.imageLink) {
            formData.append("file", this.state.file);
        } else {
            formData.append("imageLink", this.state.imageLink);
        }
        axios
            .post("/uploader", formData)
            .then((response) => {
                this.props.addImage(response.data.image_url);
            })

            .catch(function (error) {
                console.log("error: ", error);
            });
    }

    closeUploader(e) {
        e.preventDefault();
        this.setState({
            uploaderIsVisible: false,
        });
    }

    render() {
        return (
            <div className="Uploader">
                <span>
                    {this.state.uploaderIsVisible && (
                        <>
                            <div
                                className="overlay-uploader"
                                onClick={(e) => this.closeUploader(e)}
                            >
                                x
                            </div>

                            <h2>Do you want to change your image?</h2>
                            <label>Upload file from you device</label>
                            <input
                                onChange={(e) => this.handleInput(e)}
                                type="file"
                                name="file"
                                accept="image/*"
                            />
                            <label>Or upload image by url</label>
                            <input
                                onChange={(e) => this.handleChange(e)}
                                className="imageLink"
                                type="text"
                                name="imageLink"
                                placeholder="https://example.com/picture.png"
                                pattern="https://.*"
                            />
                            <button onClick={(e) => this.handleClick(e)}>
                                Upload file
                            </button>
                        </>
                    )}
                </span>
            </div>
        );
    }
}
