
const express = require("express");
const path = require('path');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/login", (req, res) => {
    if (!req.cookies.token) {
        return res
        .set("Access-Control-Allow-Credentials", "true")
        .cookie('token', 'encryptedstring', { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
        .sendFile(path.join(__dirname, 'index.html'));
    }
    return res.redirect(req.query.originurl);
});

app.get("/private", (req, res) => {
    console.log('/private request received with params: ', req.query);
    if (!req.cookies.token) {
        return res.redirect(`/login?originurl=${req.query.originurl}`);
    }
    return res.redirect(req.query.originurl);
});

app.listen(3001, () => {
  console.log("listening on port 3001...");
});