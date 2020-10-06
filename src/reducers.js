export default function (state = {}, action) {
    console.log("action at top of reducer: ", action);
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = Object.assign({}, state, {
            users: action.users,
        });
    } else if (action.type === "ACCEPT_FRIEND") {
        state = {
            ...state,
            users: state.users.map((user) => {
                // console.log("action.id", action.id);
                // console.log('user.id: ',user.id);
                if (action.id == user.id) {
                    console.log("made it to the IF accept");
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    } else if (action.type === "UNFRIEND") {
        state = {
            ...state,
            users: state.users.map((user) => {
                // console.log("action.id", action.id);
                // console.log('user.id: ',user.id);
                if (action.id == user.id) {
                    console.log("made it to the IF unfriend");
                    return {
                        ...user,
                        unfriend: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    console.log("state: ", state);

    return state;
}
