const express = require("express");
const morgan = require('morgan');
const app = express();

// setting pug as templating engine
app.set("views", "./views");
app.set("view engine", "pug");

// static assests lookup & morgan logging
app.use(express.static("public"));
app.use(morgan("common"));

// routes
app.get('/', (req, res) => {
  res.redirect("/english");
});

app.get('/english', (req, res) => {
  res.render("hello-world-english");
});

app.get('/french', (req, res) => {
  res.render("hello-world-french");
});

app.get('/serbian', (req, res) => {
  res.render("hello-world-serbian");
});

app.get('/spanish', (req, res) => {
  res.render("hello-world-spanish");
});

// server
app.listen(3000, 'localhost', () => {
  console.log("Listening on port 3000");
});
