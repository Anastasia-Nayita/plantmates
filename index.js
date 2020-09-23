const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bc = require("./bc.js");
const csurf = require("csurf");
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

app.get("/nextpage", (req, res) => {
    // res.send("WE ARE ON THE NEXT PAGE");
});
app.post("/nextpage", (req, res) => {
    //res.send("WE ARE ON THE NEXT PAGE");
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
    if (req.session.loggedIn) {
        res.redirect("/profile");
    } else if (!req.session.registered) {
        res.render("login");
    } else {
        res.redirect("/welcome");
    }
});
//////////////////////////////////LOGIN BLOCK
app.post("/login", (req, res) => {
    const { emailLog, passwordLog } = req.body;
    if (emailLog != "" && passwordLog != "") {
        db.getUserData(emailLog)
            .then((valid) => {
                if (valid) {
                    bc.compare(passwordLog, valid.rows[0].password).then(
                        (result) => {
                            let userId = valid.rows[0].id;
                            if (result) {
                                req.session.userId = userId;
                                res.redirect("/profile");
                            } else {
                                // res.render("login", {
                                //     error: "wrong, try again",
                                // });
                            }
                        }
                    );
                }
            })
            .catch((err) => {
                console.log("err", err);
                // res.render("login", {
                //     error: "something went wrong, try again",
                // });
            });
    } else {
        res.render("login", {
            error: "try again",
        });
    }
});

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
