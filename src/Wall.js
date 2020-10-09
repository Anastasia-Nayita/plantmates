import React, { useEffect, useState } from "react";
//import { socket } from "./socket";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, addPost } from "./actions";
import FeatherIcon from "feather-icons-react";

export default function Wall() {
    // const [greetee, setGreetee] = useState("World");
    const dispatch = useDispatch();
    const wallPosts = useSelector((state) => state && state.posts);
    console.log("here are my last 5 wallPosts: ", wallPosts);
    const newPost = useSelector((state) => state.newPost && state.newPosts);

    /////////we need to re-run useEffect when we add new message

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("our message: ", e.target.value);
            //socket.emit("my wallpost: ", e.target.value);
            /////  !!!!!

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
                    placeholder="add your post here"
                    rows="4"
                    cols="60"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </div>
    );
}
