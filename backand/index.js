const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000
app.get('/', (req, res) => {
    res.send('Hello Joblifts')
})

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})