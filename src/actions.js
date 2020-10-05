import axios from "axios";

export async function receiveFriendsWannabes() {
    const { data } = await axios.get("/friends");
    console.log("data in actions-receiveFriendsWannabes", data);
    return {
        type: "RECEIVE_USERS",
        users: data.users,
    };
}

export async function acceptFriendRequest(otherUserId) {
    console.log("firing , and the otherUserId is; ", otherUserId);
    const { data } = await axios.post(`/accept-friend-request/${otherUserId}`);
    console.log("data in actions-acceptFriendRequest: ", data);
    return {
        type: "ACCEPT_FRIEND",
        otherUserId,
    };
}
