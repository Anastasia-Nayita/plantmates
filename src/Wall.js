import React, { useEffect } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import FeatherIcon from "feather-icons-react";

export default function Wall() {
    // const [greetee, setGreetee] = useState("World");

    const wallPosts = useSelector((state) => state && state.msgs);
    console.log("here are my last 5 wallPosts: ", wallPosts);

    /////////we need to re-run useEffect when we add new message

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("our message: ", e.target.value);
            socket.emit("my wallpost: ", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div>
            <div className="wall-block">
                <div>
                    <h2>this is a WALL</h2>
                    <FeatherIcon icon="smile" />
                </div>
                {/* {wallPosts &&
                    wallPosts.map(function (message, i) {
                        return (
                            <div className="wall-block-post" key={i}>
                                <img
                                    className="wall-img"
                                    src={message.image_url}
                                />{" "}
                                <p>
                                    {message.first} says: {message.message}
                                </p>
                            </div>
                        );
                    })} */}
                <textarea
                    placeholder="add your message here"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </div>
    );
}
