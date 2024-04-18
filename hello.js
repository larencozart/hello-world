const express = require("express");
const morgan = require('morgan');
const app = express();


const COUNTRY_DATA = [
  { 
    path: "/english",
    flag: "flag-of-United-States-of-America.png",
    alt: "US Flag",
    title: "Go to US English site"
  },
  { 
    path: "/french",
    flag: "flag-of-France.png",
    alt: "Drapeau de la france",
    title: "Aller sur le site français"
  },
  { 
    path: "/serbian",
    flag: "flag-of-Serbia.png",
    alt: "Застава Србије",
    title: "Идите на српски сајт", 
  },
  { 
    path: "/spanish",
    flag: "flag-of-Spain.png",
    alt: "La bandera de España",
    title: "Redirigir al sito en español"
  }
]

// setting pug as templating engine
app.set("views", "./views");
app.set("view engine", "pug");

// static assests lookup & morgan logging
app.use(express.static("public"));
app.use(morgan("common"));

// view helper function 
// => to switch between current styling in pug layout
app.locals.currentPathClass = (path, currentPath) => {
  return path === currentPath ? "current" : "";
}

// routes
app.get('/', (req, res) => {
  res.redirect("/english");
});

app.get('/english', (req, res) => {
  res.render("hello-world-english", {
    countries: COUNTRY_DATA,
    currentPath: req.path,
    language: 'en-US'
  });
});

app.get('/french', (req, res) => {
  res.render("hello-world-french", {
    countries: COUNTRY_DATA,
    currentPath: req.path,
    language: 'fr-FR'
  });
});

app.get('/serbian', (req, res) => {
  res.render("hello-world-serbian", {
    countries: COUNTRY_DATA,
    currentPath: req.path,
    language: "sr-Cyrl-rs"
  });
});

app.get('/spanish', (req, res) => {
  res.render("hello-world-spanish", {
    countries: COUNTRY_DATA,
    currentPath: req.path,
    language: "es-ES"
  });
});

// server
app.listen(3000, 'localhost', () => {
  console.log("Listening on port 3000");
});
