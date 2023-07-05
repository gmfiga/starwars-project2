import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FilmPage = () => {
  const [film, setFilm] = useState({});
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  let params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    //fetch
    fetch(`http://localhost:4000/api/films/${params.id}`)
      .then((res) => res.json())
      .then((film) => setFilm(film))
      .then(
        fetch(`http://localhost:4000/api/films/${params.id}/characters`)
          .then((res) => res.json())
          .then((characters) => setCharacters(characters))
          .then(
            fetch(`http://localhost:4000/api/films/${params.id}/planets`)
              .then((res) => res.json())
              .then((planets) => setPlanets(planets))
          )
      );
  }, [params]);

  const handleClickCharacter = (id) => {
    navigate(`/characters/${id}`);
  };

  const handleClickPlanet = (id) => {
    navigate(`/planets/${id}`);
  };

  return (
    <>
      <h1 id="name">{film.title}</h1>
      <section id="generalInfo">
        <p>
          Released: <span id="height"></span>
          {film.release_date}
        </p>
        <p>
          Director: <span id="mass"></span>
          {film.director}
        </p>
        <p>
          Episode: <span id="birth_year"></span>
          {film.episode_id}
        </p>
      </section>
      <section id="planets">
        <h2>Characters</h2>
        <ul>
          {characters.map((character) => {
            return (
              <li
                key={character.id}
                onClick={(e) => handleClickCharacter(character.id)}
              >
                {character.name}
              </li>
            );
          })}
        </ul>
      </section>
      <section id="films">
        <h2>Planets</h2>
        <ul>
          {planets.map((planet) => {
            return (
              <li key={planet.id} onClick={(e) => handleClickPlanet(planet.id)}>
                {planet.name}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default FilmPage;
