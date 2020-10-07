const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/network"
);

module.exports.addUserData = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) 
        VALUES($1, $2, $3, $4)
        RETURNING id
        `,
        [first, last, email, password]
    );
};

module.exports.getUserData = (email) => {
    return db.query(
        `SELECT * FROM users 
        WHERE email = ($1)`,
        [email]
    );
};

module.exports.addCode = (email, secretcode) => {
    return db.query(
        `INSERT INTO reset_psw (email, secretcode) 
        VALUES ($1, $2)`,
        [email, secretcode]
    );
};

module.exports.getCode = (email) => {
    return db.query(
        `SELECT * FROM reset_psw 
        WHERE (email = ($1) AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes')
        ORDER BY id DESC
        LIMIT 1
        `,
        [email]
    );
};

module.exports.resetPsw = (email, password) => {
    return db.query(
        `UPDATE users
        SET password = ($2)
        WHERE email = ($1)
        `,
        [email, password]
    );
};

module.exports.getUserDataById = (id) => {
    return db.query(
        `SELECT * FROM users 
        WHERE id = ($1)`,
        [id]
    );
};

module.exports.addProfilePic = (image_url, id) => {
    return db.query(
        `UPDATE users
        SET image_url = ($1)
        WHERE id = ($2)
        RETURNING *`,
        [image_url, id]
    );
};

module.exports.updateBio = (bio, id) => {
    return db.query(
        `UPDATE users
        SET bio = ($1)
        WHERE id = ($2)
        RETURNING *`,
        [bio, id]
    );
};

module.exports.getFreshUsers = (thisUserId) => {
    return db.query(
        `SELECT * FROM users 
        WHERE id <> ($1)
        ORDER BY id DESC LIMIT 3`,
        [thisUserId]
    );
};

module.exports.getFindPeople = (thisUserId, inputVal) => {
    return db.query(
        `SELECT * FROM users 
        WHERE first ILIKE ($2)
        OR last ILIKE ($2)
        AND id <> ($1)
        LIMIT 10
        `,
        [thisUserId, inputVal + "%"]
    );
};

module.exports.getFriendStatus = (sender_id, recipient_id) => {
    return db.query(
        `SELECT * FROM friendships
        WHERE (recipient_id = $1 AND sender_id = $2)
        OR (recipient_id = $2 AND sender_id = $1);`,
        [sender_id, recipient_id]
    );
};

module.exports.sendFriendReq = (sender_id, recipient_id) => {
    return db.query(
        `INSERT INTO friendships(sender_id, recipient_id)
        VALUES ($1, $2)`,
        [sender_id, recipient_id]
    );
};

module.exports.acceptFriend = (sender_id, recipient_id) => {
    return db.query(
        `UPDATE friendships
        WHERE (sender_id = ($1) AND recipient_id=($2))
        SET accepted = (TRUE)
       `,
        [sender_id, recipient_id]
    );
};

module.exports.deleteFriend = (sender_id, recipient_id) => {
    return db.query(
        `DELETE FROM friendships
        WHERE (sender_id = ($1) AND recipient_id=($2))`,
        [sender_id, recipient_id]
    );
};

module.exports.getFriendList = (recipient_id) => {
    return db.query(
        `SELECT users.id, first, last, image_url, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND recipient_id = $1 AND sender_id  = users.id)
        OR (accepted = true AND recipient_id = $1 AND sender_id  = users.id)
        OR (accepted = true AND sender_id  = $1 AND recipient_id = users.id)`,
        [recipient_id]
    );
};

module.exports.getLastTenMsgs = () => {
    return db.query(
        `SELECT * FROM chat
        JOIN users
        ON (chat.sender_id = users.id)
        ORDER BY chat.id DESC 
        LIMIT (10)`
        // `SELECT * FROM chat
        // ORDER BY id DESC
        // LIMIT (10)`
    );
};

module.exports.addChatMsg = (sender_id, message) => {
    console.log("staff from db: ", sender_id, message);
    return db.query(
        `INSERT INTO chat
        (sender_id, message)
       VALUES ($1, $2)
       RETURNING *`,
        [sender_id, message]
    );
};

module.exports.getUserChatDataById = (id) => {
    return db.query(
        `SELECT first, last, image_url FROM users 
        WHERE id = ($1)`,
        [id]
    );
};
