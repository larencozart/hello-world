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
];

const LANGUAGE_CODES = {
  english: "en-US",
  french: "fr-FR",
  serbian: "sr-Cryl-rs",
  spanish: "es-ES"
};

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

app.get('/:language', (req, res, next) => {
  const language = req.params.language;
  const languageCode = LANGUAGE_CODES[language];

  // validate user entered path
  if (!languageCode) {
    next(new Error(`Language not supported: ${language}`));
  } else {
    res.status(202).render(`hello-world-${language}`, {
      countries: COUNTRY_DATA,
      currentPath: req.path,
      language: LANGUAGE_CODES[language],
    });
  }
});


// error handler
app.use((err, req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
});

// server
app.listen(3000, 'localhost', () => {
  console.log("Listening on port 3000");
});
