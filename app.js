const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json())
const mongourl = "mongodb+srv://tikko:1234@cluster0.lugpwd2.mongodb.net/?retryWrites=true&w=majority"
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
mongoose.connect(mongourl, {
    useNewUrlParser: true
})
    .then(() => {
        app.listen("4000", () => {
            console.log("connected");
        })
    })
    .catch(e => console.log(e));

require("./userSchema");
const user = mongoose.model("tikkoCol");
app.post("/signup", async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    try {
        const oldUser = await user.findOne({ email });
        if (oldUser) {
            return res.send({ error: "User Exist" })
        }
        await user.create({
            email,
            password,
            firstname,
            lastname
        });
        res.send({ status: "ok" });
    }
    catch (error) {
        res.send({ status: "error" })
    }
})
require("./itemsSchema");
const item = mongoose.model("tikkoitem")
app.post("/items", async (req, res) => {
    try {
        const { id, email } = req.body;
        const oldUser = await user.findOne({ email });
        oldUser.cart.push(id)
        oldUser.save();
        res.send({ status: "ok" });
    }
    catch (error) {
        res.send({ status: "error" })
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user1 = await user.findOne({ email });
    if (!user1) {
        return res.json({ error: "User Not found" });
    }
    const a = password;
    const b = user1.password
    if (await a == b) {
        const token = jwt.sign({ username: user1.username }, JWT_SECRET, {
            expiresIn: "15m",
        });

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Password" });
});

app.get("/getCart/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const curUser = await user.findOne({ email });
        res.send({ status: "ok", data: curUser.cart });
    } catch (error) {
        console.log(error);
    }
});