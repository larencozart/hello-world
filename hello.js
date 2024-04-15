const express = require("express");
const app = express();

// setting pug as templating enging
app.set("view", "./views");
app.set("view engine", "pug");

// route
app.get('/', (req, res) => {
  res.render("hello-world-english");
});

// server
app.listen(3000, 'localhost', () => {
  console.log("Listening on port 3000");
});
