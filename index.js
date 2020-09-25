const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bc = require("./bc.js");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");

app.use(compression());
app.use(express.static("./public"));
app.use(express.json());

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

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
    console.log(req.body);
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
            console.log("valid: ", valid);
            const validEmail = valid.rows[0].email;
            if (valid) {
                console.log("worked!! there is such email");
                //console.log("valid: ", valid);
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                db.addCode(validEmail, secretCode)
                    .then((result) => {
                        console.log("result in db.addCode: ", result);
                        sendEmail(
                            validEmail,
                            `Here is your reset code: ${secretCode} . It will expire! Take it and run!`,
                            secretCode
                        );
                        // res.json({
                        //     timestamp: result.rows[0].created_at,
                        // });
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

app.post("password/reset/verify", (req, res) => {});

// const { sendEmail } = require("ses.js");
// sendEmail("funckychiken@mail", "something to tell yo", "something more o tell");

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});

///////
// reset password.js

// export default class ResetPassword extends React.Component{
// 	constructor(props){
//         super(props)
//         this.state = {currentDisplay:1}
// }
// render(){
//     //let elem,
//     // if() {
//     //     elem =( div)
//     // } else if(){}

//     return (
//         div
//         h1 - show always
//         {this.state.currentDisplay==1 && <div></div>}
//          {this.state.currentDisplay==2 && <div></div>}
//          // {elem}

//     )
// }
// }
