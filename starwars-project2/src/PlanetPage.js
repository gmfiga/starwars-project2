import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const PlanetPage = () => {
  const [planet, setPlanet] = useState({});
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);
  let params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    //fetch
    fetch(`http://localhost:4000/api/planets/${params.id}`)
      .then((res) => res.json())
      .then((planet) => setPlanet(planet))
    .then(
      fetch(`http://localhost:4000/api/planets/${params.id}/films`)
      .then((res) => res.json())
      .then((films) => setFilms(films))
    )
    .then(
      fetch(`http://localhost:4000/api/planets/${params.id}/characters`)
      .then((res) => res.json())
      .then((characters) => setCharacters(characters))
    );
  }, [params]);

  const handleClickFilm = (id) => {
    navigate(`/films/${id}`);
  };

  const handleClickCharacter = (id) => {
    navigate(`/characters/${id}`);
  };

  return (
    <>
      <h1 id="name">{planet.name}</h1>
      <section id="generalInfo">
        <p>
          Climate: <span id="climate"></span>
          {planet.climate} 
        </p>
        <p>
          Population: <span id="population"></span>
          {planet.population} 
        </p>
        <p>
          Terrain: <span id="terrain"></span>
          {planet.terrain}
        </p>
      </section>
      <section id="characters">
        <h2>Characters</h2>
        <ul>
          {characters.map((character) => {
            return (
              <li key={character.id} onClick={(e) => handleClickCharacter(character.id)}>
                {character.name}
              </li>
            );
          })}
        </ul>
      </section>
      <section id="films">
        <h2>Films appeared in</h2>
        <ul>
          {films.map((film) => {
            return (
              <li key={film.id} onClick={(e) => handleClickFilm(film.id)}>
                {film.title}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default PlanetPage;