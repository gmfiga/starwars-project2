const express = require("express");
var dao = require("./mongo-dao");

const app = express();
const port = 4000;

app.use(express.json()); //Parse JSON body

app.get("/api/planets", (req, res) => {
  dao.findAllPlanets((planets) => {
    if (!planets) {
      res.status(404).end();
    } else {
      res.send(planets);
    }
  });
  //res.send({ name: "Test", planet: "Tatooine" });
});

app.get("/api/films", (req, res) => {
  dao.findAllFilms((films) => {
    if (!films) {
      res.status(404).end();
    } else {
      res.send(films);
    }
  });
});

app.get("/api/films/:id", (req, res) => {
  dao.findFilm(req.params.id, (film) => {
    if (!film) {
      res.status(404).end();
    } else {
      res.send(film);
    }
  });
});

app.get("/api/films/:id/characters", (req, res) => {
  dao.findFilmCharacters(req.params.id, (character) => {
    if (!character) {
      res.status(404).end();
    } else {
      res.send(character);
    }
  });
});

app.get("/api/films/:id/planets", (req, res) => {
  dao.findFilmPlanets(req.params.id, (planet) => {
    if (!planet) {
      res.status(404).end();
    } else {
      res.send(planet);
    }
  });
});

app.get("/api/characters/:id/films", (req, res) => {
  dao.findCharacterFilms(req.params.id, (film) => {
    if (!film) {
      res.status(404).end();
    } else {
      res.send(film);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
