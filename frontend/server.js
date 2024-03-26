const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 5000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/test_route", function (req, res) {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
