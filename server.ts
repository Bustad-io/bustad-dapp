const express = require('express');
const path = require('path');
const app = express();

app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 8080;
console.log(port);

app.listen(port);