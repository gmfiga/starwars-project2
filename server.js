const express = require("express");
var dao = require("./mongo-dao");

const app = express();
const port = 4000;

app.get("/api/planets", (req, res) => {
  dao.findAllPlanets(
    (planets) => {
        if(!planets) {
            res.status(404).end();
        } else {
            res.send(planets);
        }
    })
});

app.get("/api/planets/:id", (req, res) => {
  dao.findPlanet( req.params.id,
    (planet) => {
        if(!planet) {
            res.status(404).end();
        } else {
            res.send(planet);
        }
    })
});

app.get("/api/planets/:id/films", (req, res) => {
  dao.findFilmsWithPlanet( req.params.id,
    (films) => {
        if(!films) {
            res.status(404).end();
        } else {
            res.send(films);
        }
    })
});

app.get("/api/planets/:id/characters", (req, res) => {
  dao.findCharsWithPlanet( req.params.id,
    (chars) => {
        if(!chars) {
            res.status(404).end();
        } else {
            res.send(chars);
        }
    })
});

app.get("/api/characters", (req, res) => {
  dao.findAllCharacters(
    (characters) => {
        if(!characters) {
            res.status(404).end();
        } else {
            res.send(characters);
        }
    })
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
