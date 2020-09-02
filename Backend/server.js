
const express = require('express');
const apiRoute = require('./routes/api');
const app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoute);

app.listen(8000, () => console.log("Server started on port 8000"));