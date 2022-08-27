const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Thread = require("./models/Thread");

app.use(express.static("public"));

app.set("PORT", process.env.PORT || 5000);

//mongoDBに接続
mongoose.connect(process.env.MONGODB_URI ||
    "mongodb+srv://d-hori18:d-hori@cluster0.4v0ab4l.mongodb.net/?retryWrites=true&w=majority"
    ,{ useNewUrlParser: true}
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



app.listen(PORT, console.log("server runnning"));
