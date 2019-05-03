const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
mongoose.connect("mongodb+srv://Annalanh:Annalanh99@@cluster0-ebnpt.mongodb.net/test?retryWrites=true", {useNewUrlParser: true}, (err) => {
    if(err) console.log(err);
    else console.log("Connected to DB")
})

const apiRouter = require("./routers/apiRouter");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use("/api", apiRouter);

app.listen(6969, (err) => {
    if(err) console.log(err);
    else console.log("Server start success");
});