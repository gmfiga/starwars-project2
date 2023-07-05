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
  //res.send({ name: "Test", planet: "Tatooine" });
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
