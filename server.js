const express = require("express");

const app = express();
const port = 4000;

app.get("/api/planets", (req, res) => {
  res.send({ name: "Test", planet: "Tatooine" });
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
