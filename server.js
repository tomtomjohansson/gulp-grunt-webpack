var path = require('path');
const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/src/index.html'));
});

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at ${PORT}`);
});
