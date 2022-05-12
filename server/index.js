const errorMiddleware = require('./middleware/errormw');
const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./user/routes')
const watchlistRoute = require('./watchlist/routes')
const messagesRoute = require('./messages/routes')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3001
const cors = require('cors')
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, GET, DELETE"
        )
        return res.status(200).json({})
    }
    next()
})
app.use(express.json())
app.use(cors())
app.use("/api/user", authRoute)
app.use("/api/messages", messagesRoute)
app.use("/api/watchlist", watchlistRoute)
app.use(errorMiddleware);

async function runServer(){
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log("Connected to MongoDB"))
        app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`))
    }
    catch (e) {
        console.log("error:"+e)
    }
}


runServer()

module.exports = app