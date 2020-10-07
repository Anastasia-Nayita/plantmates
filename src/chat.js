import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {
    const elemRef = useRef();
    const chatMsgs = useSelector((state) => state && state.msgs);
    console.log("here are my last 10 messages: ", chatMsgs);

    useEffect(() => {
        //console.log("chat hook component mounted");
        //console.log("elementRef if: ", elemRef);
        //console.log("scrollTop: ", scrollTop);

        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMsgs]);

    /////////we need to re-run useEffect when we add new message

    const keyCheck = (e) => {
        // console.log("value of textarea", e.target.value);
        // console.log("key pressed", e.key);

        if (e.key === "Enter") {
            e.preventDefault();
            //console.log("our message: ", e.target.value);
            socket.emit("my chat message", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div>
            <p>Welcome to chat</p>
            <div className="chat-block" ref={elemRef}>
                {chatMsgs &&
                    chatMsgs.map(function (message, i) {
                        return (
                            <div className="chat-block-messages" key={i}>
                                <img
                                    className="chat-img"
                                    src={message.image_url}
                                />{" "}
                                <p>
                                    {message.first} says: {message.message}
                                </p>
                            </div>
                        );
                    })}
                <textarea
                    placeholder="add your message here"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </div>
    );
}
