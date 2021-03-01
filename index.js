
const express = require("express");
const path = require('path');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/login", (req, res) => {
    if (!req.cookies.token) {
        return res
        .set("Access-Control-Allow-Credentials", "true")
        .cookie('token', 'encryptedstring', { httpOnly: true })
        .sendFile(path.join(__dirname, 'index.html'));
    }
    return res.redirect(req.query.originurl);
});

app.get("/private", (req, res) => {
    console.log('/private request received with params: ', req.query);
    if (!req.cookies.token) {
        return res.redirect(`/login?originurl=${req.query.originurl}`);
    }
    res.redirect(req.query.originurl);
});

app.get("/", (req, res) => {
    console.log('/ request received with params: ', req.query);
    console.log('/ request received with headers: ', req.headers);
    console.log('/ request received with headers: ', req);
    return res.redirect(`/private?originurl=${req.query.originurl}`);
});

app.get("/sample.pac", (req, res) => {
    console.log('request received with params: ', req.query);
    return res.sendFile(path.join(__dirname, 'sample.pac'));
});

app.listen(3001, () => {
  console.log("listening on port 3001...");
});