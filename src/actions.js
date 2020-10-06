import axios from "axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get(`/friends.json`);

    console.log("data.users in actions-receiveFriendsWannabes", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        users: data,
    };
}

export async function acceptFriendRequest(otherUserId) {
    console.log(
        "firing acceptFriendRequest, and the otherUserId is; ",
        otherUserId
    );
    const { data } = await axios.post(`/accept-friend-request/${otherUserId}`);
    console.log("data in actions-acceptFriendRequest: ", data);
    return {
        type: "ACCEPT_FRIEND",
        accepted: data.accepted,
        id: otherUserId,
    };
}

export async function unfriend(otherUserId) {
    console.log("firing unfriend, and the otherUserId is; ", otherUserId);
    const { data } = await axios.post(`/end-friendship/${otherUserId}`);
    console.log("data in actions-unfriend: ", data);
    return {
        type: "UNFRIEND",
        unfriend: data.unfriend,
        id: otherUserId,
    };
}
