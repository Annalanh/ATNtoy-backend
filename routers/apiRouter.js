const express = require('express');
const Router = express.Router;

const apiRouter = new Router();
const stockApiRouter = require("./stockApiRouter");

//localhost:6969/api ra hello
apiRouter.get("/", (req, res) => {
    res.send("Hello")
});

apiRouter.use("/stock", stockApiRouter)
module.exports = apiRouter;