const express = require('express');
const helmet = require("helmet");
const app = express();
app.use(
  helmet({
    referrerPolicy: false,
  }),
);
const port = 3050;

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});