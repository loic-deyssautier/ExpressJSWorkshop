const express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors");
const connectDB = require('./src/config/connection');
const routes = require('./src/routes/index');

const app = express();
const http = require('http');
const server = http.createServer(app);

require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Hello World!");
});
app.use('', routes);



server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

