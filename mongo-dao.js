const mongodb = require("mongodb"); // mongo client library  
const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "Project2";
let db;

async function startup() {
    let client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName)
    //collection = db.collection("planets");
}
startup();

module.exports.findAllPlanets = function(callback) {
    let dataPromise = db.collection("planets").find({}).toArray();
    dataPromise.then((planets) => callback(planets));
}

module.exports.findPlanet = function(id, callback) {
    let dataPromise = db.collection("planets").findOne({"id": +id});
    dataPromise.then((planet) => callback(planet));
}

module.exports.findFilmsWithPlanet = async function(id, callback) {
    let dataPromise = db.collection("films_planets").find({"planet_id": +id});
    
    let dataPromiseArray = await dataPromise.toArray();
    
    let filmPromises = dataPromiseArray.map((filmMatch) => {
        return db.collection("films").findOne({"id": +filmMatch.film_id});
    });
      
    await Promise.all(filmPromises).then((films) => callback(films));
}

module.exports.findCharsWithPlanet = function(id, callback) {
    let dataPromise = db.collection("characters").find({"homeworld": +id}).toArray();
    dataPromise.then((characters) => callback(characters));
}

module.exports.findAllCharacters = function(callback) {
    let dataPromise = db.collection("characters").find({}).toArray();
    dataPromise.then((characters) => callback(characters));
}

module.exports.findCharacter = function(id, callback) {
    let dataPromise = db.collection("characters").findOne({"id": +id});
    dataPromise.then((character) => callback(character));
}