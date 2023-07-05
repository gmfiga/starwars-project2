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
  dao.findBook(req.params.id, (film) => {
    if (!film) {
      res.statusCode = 404;
      res.end();
    } else {
      res.send(film);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
