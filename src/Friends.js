import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from "./actions";

export default function friendsList() {
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
        <div>
            <div className="friends-sec">
                <h2>Friends</h2>
                {friends &&
                    friends.map(function (friend) {
                        return (
                            <div className="friends-block" key={friend.id}>
                                <Link to={`/user/${friend.id}`}>
                                    <img
                                        className="profilepic"
                                        src={friend.image_url}
                                        alt={`{first} {last}`}
                                    />
                                    <p>
                                        {friend.first} {friend.last}
                                    </p>
                                </Link>
                                <button
                                    onClick={() =>
                                        dispatch(unfriend(friend.id))
                                    }
                                >
                                    Unfriend
                                </button>
                            </div>
                        );
                    })}
            </div>

            <div className="wannabes-sec">
                <h2>Friend requests</h2>
                {wannabes &&
                    wannabes.map(function (wannabe) {
                        return (
                            <div className="wannabes-block" key={wannabe.id}>
                                <img
                                    className="profilepic"
                                    src={wannabe.image_url}
                                    alt={`{first} {last}`}
                                />{" "}
                                <p>
                                    {wannabe.first} {wannabe.last}
                                </p>
                                <button
                                    onClick={() =>
                                        dispatch(
                                            acceptFriendRequest(wannabe.id)
                                        )
                                    }
                                >
                                    Accept friend request
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
