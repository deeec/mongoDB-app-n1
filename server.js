const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Thread = require("./models/Thread");

app.use(express.json());//
app.use(express.static("public"));

//app.get("/", express.static("public"));//エントリポイントの設定

//mongoDBに接続
mongoose.connect(
    "mongodb+srv://d-hori18:d-hori@cluster0.4v0ab4l.mongodb.net/?retryWrites=true&w=majority"
).
then(() => console.log("db connected!"))
.catch((err) => console.log(err));

//getメソッド
app.get("/api/v1/threads", async(req, res) => {
    try {
        const allThreads = await Thread.find({});
        res.status(200).json(allThreads);
    } catch (err) {
        console.log(err);
    }
});

//postメソッド
app.post("/api/v1/thread", async(req, res) => {
    try {
        const createThread = await Thread.create(req.body);
        res.status(200).json(createThread);
    } catch (err) {
        console.log(err);
    }
});



app.listen(process.env.PORT || 5000, console.log("server runnning"));
