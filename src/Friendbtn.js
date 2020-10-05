import React, { useState, useEffect } from "react";

import axios from "./axios";

export default function Friendbtn(props) {
    const [buttonText, setButton] = useState("");
    useEffect(() => {
        //console.log("blabla");
        (async () => {
            try {
                const { data } = await axios.get(
                    `/initial-friendship-status/` + props.id
                );
                console.log("console data", data);
                let friendRequest = data[0];
                if (data.length === 0) {
                    setButton("make friend request");
                    //console.log("buttonText", buttonText);
                } else if (friendRequest.accepted) {
                    // "unfriend"
                    setButton("end friendship");
                } else if (friendRequest.senderId == props.id) {
                    // "accept"
                    setButton("accept friend request");
                } else {
                    // "cancel"
                    setButton("cancel friend request");
                }
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    });
    const changeStatus = async () => {
        if (buttonText == "make friend request") {
            try {
                const { data } = await axios.post(
                    `/send-friend-request/` + props.id
                );
                console.log("if buttonText == make a friend req", data);
                setButton("cancel friend request");
            } catch (err) {
                console.log("err: ", err);
            }
        } else if (buttonText == "cancel friend request") {
            try {
                const { data } = await axios.post(
                    `/end-friendship/` + props.id
                );
                console.log("if (buttonText == cancel friend request", data);
                setButton("make friend request");
            } catch (err) {
                console.log("err: ", err);
            }
        } else if (buttonText == "accept friend request") {
            try {
                const { data } = await axios.post(
                    `/accept-friend-request/` + props.id
                );
                console.log("if (buttonText == cancel friend request", data);
                setButton("end friendship");
            } catch (err) {
                console.log("err: ", err);
            }
        } else if (buttonText == "end friendship") {
            try {
                const { data } = await axios.post(
                    `/end-friendship/` + props.id
                );
                console.log("if (buttonText == cancel friend request", data);
                setButton("make friend request");
            } catch (err) {
                console.log("err: ", err);
            }
        }
    };

    return (
        <div>
            <button onClick={changeStatus}>{buttonText}</button>
        </div>
    );
}
