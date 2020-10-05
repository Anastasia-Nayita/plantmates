import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from "./actions";

export default function FriendsList() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );
    const wannabes = useSelector(
        (state) => state.users && state.users.filter((user) => !user.accepted)
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!friends || !wannabes) {
        return null;
    }
    return (
    <div>List of friends</div>

        render two lists:
            -map the filtered lists into elements that
                -shows first, last and photo
                -links photo and maybe name to profile
                -has the appropriate button based on whether 
                user is a friend or a wannabe. 
                These buttons will need click handlers that dispatch actions
        );
}
