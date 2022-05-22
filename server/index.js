const errorMiddleware = require('./middleware/errormw');
const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./user/routes')
const watchlistRoute = require('./watchlist/routes')
const reviewRoute = require('./reviews/routes')
const reportRoute = require('./reports/routes')
const messagesRoute = require('./messages/routes')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3001
const cors = require('cors')
app.use(cors({
    credentials: true,
    origin: ["https://w2w-front.herokuapp.com" , "http://localhost:3000"]
}));
app.use(express.json())
app.use("/api/user", authRoute)
app.use("/api/messages", messagesRoute)
app.use("/api/watchlist", watchlistRoute)
app.use("/api/review", reviewRoute)
app.use("/api/report", reportRoute)
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