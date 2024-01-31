
const express = require('express')




const cors=require("cors")
const { MongoDBconnection } = require('./DB/db')
const { userRouter } = require('./Routes/user')
const CouresRouter = require('./Routes/Course')
const BaseItemRouter = require('./Routes/BaseItem')
const {auth}=require("./Middleware/auth")
const ArticleRouter = require('./Routes/Article')
const TweetRouter = require('./Routes/Tweet')

require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())





app.use("/User",userRouter)


app.use("/BaseItems", auth, BaseItemRouter);
app.use("/course", auth, CouresRouter);
app.use("/Article", auth, ArticleRouter);
app.use("/tweet", auth, TweetRouter);


app.listen(process.env.PORT, async () => {
    try {
        await MongoDBconnection
        console.log("Connected to Database Succesfully");
    } catch (error) {
        console.log(error)
        console.log("error Occured while connectng to db");
    }
    console.log("server is connected to port number 5038");
})