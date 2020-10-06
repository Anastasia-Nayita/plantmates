const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bc = require("./bc.js");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const multer = require("multer");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config");
const uidSafe = require("uid-safe");
/////////////////////////////////////
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" }); /// if deploy on heroku add instead myheroukuapp.blabla - name of the port

app.use(compression());
app.use(express.static("./public"));
app.use(express.json());

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

// app.use(
//     cookieSession({
//         secret: `I'm always angry.`,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//     })
// );

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(
    express.urlencoded({
        //// do we need it???
        extended: false,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    res.setHeader("x-frame-options", "deny");
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    //console.log(req.body);
    if (first != "" && last != "" && email != "" && password != "") {
        bc.hash(password)
            .then((hashedPassword) => {
                req.body.password = hashedPassword;
                db.addUserData(first, last, email, hashedPassword)
                    .then((resultUser) => {
                        req.session.registered = true;
                        req.session.userId = resultUser.rows[0].id;
                        res.json({ error: false });
                        // res.redirect("/profile");
                    })

                    .catch((err) => {
                        console.log("err in post register: ", err);
                        res.send("something went wrong, try one more time");
                        res.json({ error: true });
                    });
            })
            .catch((err) => {
                console.log("err : ", err);
                res.json({ error: true });
            });
    }
});

app.get("/login", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
//////////////////////////////////LOGIN BLOCK
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email != "" && password != "") {
        db.getUserData(email)
            .then((valid) => {
                if (valid) {
                    bc.compare(password, valid.rows[0].password).then(
                        (result) => {
                            let userId = valid.rows[0].id;
                            if (result) {
                                req.session.userId = userId;

                                res.redirect("/nextpage");
                            } else {
                                res.json({ err: true });
                            }
                        }
                    );
                }
            })
            .catch((err) => console.log("err in login: ", err));
    } else {
        res.json({ err: true }); //err in db.query
    }
});

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    if (email != "") {
        db.getUserData(email).then((valid) => {
            // console.log("valid: ", valid);
            const validEmail = valid.rows[0].email;
            if (valid) {
                console.log("worked!! there is such email");
                //console.log("valid: ", valid);
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                db.addCode(validEmail, secretCode)
                    .then((result) => {
                        // console.log("result in db.addCode: ", result);
                        sendEmail(
                            validEmail,
                            `Here is your reset code: ${secretCode} . It will expire! Take it and run!`,
                            secretCode
                        );
                        res.json({ err: false });
                    })
                    .catch((err) => {
                        console.log("err in db.addCode: ", err);
                    });
            } else {
                console.log("wrong emeil");
                res.json({ err: true });
            }
        });
    }
});

app.post("/password/reset/verify", (req, res) => {
    const { secretCode, email, password, confpassword } = req.body;

    if (
        email != "" &&
        password != "" &&
        secretCode != "" &&
        confpassword != 0 &&
        password === confpassword
    ) {
        db.getCode(email)
            .then((result) => {
                if (req.body.secretCode === result.rows[0].secretcode) {
                    bc.hash(password).then((hashedPassword) => {
                        db.resetPsw(email, hashedPassword)
                            .then(() => {
                                res.json({
                                    err: false,
                                });
                                // console.log("we did it till db.resetPsq!!!");
                            })
                            .catch((err) => {
                                console.log("err in db.resetPsw: ", err);
                                res.json({ err: true });
                            });
                    });
                }
            })
            .catch((err) => {
                console.log("err in db.getCode: ", err);
            });
    } else {
        console.log("empty fields! not cool!");
        res.json({ err: true });
    }
});

app.get("/user", async function (req, res) {
    //console.log("req.session in app.get.user : ", req.session);
    try {
        const { rows } = await db.getUserDataById(req.session.userId);
        //console.log("rows[0] in /user/", rows[0]);
        res.json(rows[0]);
    } catch (err) {
        console.log("err in getUserDataById: ", err);
    }
});

app.post("/uploader", uploader.single("file"), s3.upload, async function (
    req,
    res
) {
    var imageUrl;
    if (req.body.imageLink) {
        imageUrl = req.body.imageLink;
    } else {
        const filename = req.file.filename;
        imageUrl = `${s3Url}${filename}`;
    }

    try {
        const { rows } = await db.addProfilePic(imageUrl, req.session.userId);
        res.json(rows[0]);
    } catch (err) {
        console.log("err in addProfilePic: ", err);
    }
});

app.post("/editbio", (req, res) => {
    const { bio } = req.body;

    db.updateBio(bio, req.session.userId)
        .then((result) => {
            //console.log("result in updateBio", result);
            res.json({
                success: true,
                err: false,
            });
        })
        .catch((err) => {
            console.log("err in db.editbio: ", err);
        });
});

app.get("/api/user/:id", async function (req, res) {
    try {
        const { rows } = await db.getUserDataById(req.params.id);
        res.json({ ...rows[0], loggedId: req.session.userId });
        //console.log("rows in user/id", rows[0]);
    } catch (err) {
        console.log("err in user/id: ", err);
    }
});

app.post("/logout", (req, res) => {
    req.session = null;
    res.json({ err: false });
});

app.get("/get-users", async function (req, res) {
    try {
        const { rows } = await db.getFreshUsers(req.session.userId);
        //console.log("rows in users search fresh", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in users: ", err);
    }
});

app.get("/get-users/:userInput", async function (req, res) {
    try {
        const { rows } = await db.getFindPeople(
            req.session.userId,
            req.params.userInput
        );
        //console.log("rows in users search findpeople", rows);
        res.json(rows);
    } catch (err) {
        console.log("err in users: ", err);
    }
});

/////// checks what is status before
app.get("/initial-friendship-status/:otherUserId", async function (req, res) {
    try {
        const { rows } = await db.getFriendStatus(
            req.session.userId,
            req.params.otherUserId
        );
        res.json(rows);
        console.log("check the status when page mounts: ", rows);
    } catch (err) {
        console.log("err in users: ", err);
    }
});

////// after click Friendbtn - adds rows in table
app.post("/send-friend-request/:otherUserId", async function (req, res) {
    try {
        const { rows } = await db.sendFriendReq(
            req.session.userId,
            req.params.otherUserId
        );
        res.json(rows);
        console.log("after click make friend req: ", rows);
    } catch (err) {
        console.log("err in users: ", err);
    }
});

////// accept friend button - update table
app.post("/accept-friend-request/:otherUserId", async function (req, res) {
    try {
        const { rows } = await db.acceptFriend(
            req.session.userId,
            req.params.otherUserId
        );
        res.json(rows);
    } catch (err) {
        console.log("err in users: ", err);
    }
});

////// cancel friend reques or end friendship - delete two rows in table
app.post("/end-friendship/:otherUserId", async function (req, res) {
    try {
        const { rows } = await db.deleteFriend(
            req.session.userId,
            req.params.otherUserId
        );
        res.json(rows);
    } catch (err) {
        console.log("err in users: ", err);
    }
});

app.get(`/friends.json`, async function (req, res) {
    try {
        const { rows } = await db.getFriendList(req.session.userId);
        res.json(rows);
        console.log("rows in FriendsList: ", rows);
    } catch (err) {
        console.log("err in users: ", err);
    }
});

app.get("*", function (req, res) {
    // res.sendFile(__dirname + "/index.html");
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log("I'm listening...Tell me something new 👸");
});

io.on("connection", (socket) => {
    console.log(`socket with ${socket.id} connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    socket.on("disconnect", () => {
        console.log("socket with id disconnected: ", socket.id);
    });

    // db.getLastTenMsgs().then(({ rows }) => {
    //     console.log("messages: ", rows);
    //     io.sockets.emit("chatMessages", rows);
    // });

    socket.on("my chat message", (newMsg) => {
        console.log("this message is coming from chat.js component: ", newMsg);

        console.log("user who send message: ", socket.request.session.userId);
        io.sockets.emit("addChatMsg", newMsg);
    });

    /// db query needs to be JOIN users and chats table
    //// the newest message should come at the bottom ( order in query)

    ///io.sockets.emit('addChatMsg', obj{newMsg, first, picture} )
});
