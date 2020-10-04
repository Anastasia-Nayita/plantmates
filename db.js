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
