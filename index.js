const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const bc = require("./bc.js");

app.use(compression());
app.use(express.static("./public"));
app.use(express.json());

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

app.post("/welcome", (req, res) => {
    ////welcome OR register???
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
                        // res.redirect("/profile");
                    })
                    .catch((err) => {
                        console.log("err in post register: ", err);
                        res.send("something went wrong, try one more time");
                    });
            })
            .catch((err) => {
                console.log("err : ", err);
            });
    }
});
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
