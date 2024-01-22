const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);

require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("Hello World!");
});



server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

