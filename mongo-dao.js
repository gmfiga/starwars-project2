const mongodb = require("mongodb"); // mongo client library
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "Project2";
let db;

async function startup() {
  let client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  //collection = db.collection("planets");
}
startup();

module.exports.findAllPlanets = function (callback) {
  let dataPromise = db.collection("planets").find({}).toArray();
  dataPromise.then((planets) => callback(planets));
};

module.exports.findPlanet = function (id, callback) {
  let dataPromise = db.collection("planets").findOne({ id: +id });
  dataPromise.then((planet) => callback(planet));
};

module.exports.findFilmsWithPlanet = async function (id, callback) {
  let dataPromise = db.collection("films_planets").find({ planet_id: +id });

  let dataPromiseArray = await dataPromise.toArray();

  let filmPromises = dataPromiseArray.map((filmMatch) => {
    return db.collection("films").findOne({ id: +filmMatch.film_id });
  });

  await Promise.all(filmPromises).then((films) => callback(films));
};

module.exports.findCharsWithPlanet = function (id, callback) {
  let dataPromise = db
    .collection("characters")
    .find({ homeworld: +id })
    .toArray();
  dataPromise.then((characters) => callback(characters));
};

module.exports.findAllCharacters = function (callback) {
  let dataPromise = db.collection("characters").find({}).toArray();
  dataPromise.then((characters) => callback(characters));
};

module.exports.findCharacter = function (id, callback) {
  let dataPromise = db.collection("characters").findOne({ id: +id });
  dataPromise.then((character) => callback(character));
};

module.exports.findAllFilms = function (callback) {
  let dataPromise = db.collection("films").find({}).toArray();
  dataPromise.then((films) => callback(films));
};

// retrieve single film
module.exports.findFilm = function (id, callback) {
  let dataPromise = db.collection("films").findOne({ id: +id });
  dataPromise.then((films) => callback(films));
};

module.exports.findFilmCharacters = async function (film_id, callback) {
  let characterMatchPromise = db
    .collection("films_characters")
    .find({ film_id: +film_id });

  let characterMatchArray = await characterMatchPromise.toArray();

  let characterPromises = characterMatchArray.map((characterMatch) => {
    return db
      .collection("characters")
      .findOne({ id: +characterMatch.character_id });
  });

  await Promise.all(characterPromises).then((character) => callback(character));
};

module.exports.findFilmPlanets = async function (film_id, callback) {
  let planetMatchPromise = db
    .collection("films_planets")
    .find({ film_id: +film_id });

  let planetMatchArray = await planetMatchPromise.toArray();

  let planetPromises = planetMatchArray.map((planetMatch) => {
    return db.collection("planets").findOne({ id: +planetMatch.planet_id });
  });

  await Promise.all(planetPromises).then((planet) => callback(planet));
};

module.exports.findCharacterFilms = async function (character_id, callback) {
  let filmMatchPromise = db
    .collection("films_characters")
    .find({ character_id: +character_id });

  let filmMatchArray = await filmMatchPromise.toArray();

  let filmPromises = filmMatchArray.map((filmMatch) => {
    return db.collection("films").findOne({ id: +filmMatch.film_id });
  });

  await Promise.all(filmPromises).then((film) => callback(film));
};
