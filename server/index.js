const express = require('express')
const app = express();
const PORT =  3001
const cors = require('cors')

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));




app.get('/', (req, res) => {
    res.send(`Test`)

})




function runServer(){
    try {
        app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
}

runServer();