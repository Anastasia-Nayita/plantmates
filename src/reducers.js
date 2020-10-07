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
                    //console.log("made it to the IF unfriend");
                    return {
                        ...user,
                        unfriend: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    } else if (action.type === "RECEIVE_LAST_10") {
        //console.log("NEW MSG: ", action.msgs);
        state = {
            ...state,
            msgs: action.msgs,
        };
    } else if (action.type === "RECEIVE_NEW_MSG") {
        console.log("state: ", state);
        console.log("action msg[0]", action.newMsg[0]);
        console.log("action msg", action.newMsg);
        state = {
            ...state,
            //state: action.newMsg,

            msgs: [...state.msgs, action.newMsg], ///// after JOIN change in to spread
        };
    }

    console.log("Reducer state: ", state);

    return state;
}
