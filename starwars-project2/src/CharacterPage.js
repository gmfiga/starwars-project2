import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CharacterPage = () => {
  const [character, setCharacter] = useState({});
  const [planet, setPlanet] = useState({});
  const [films, setFilms] = useState([]);
  let params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    //fetch
    fetch(`http://localhost:4000/api/characters/${params.id}`)
      .then((res) => res.json())
      .then((char) => setCharacter(char))
      .then(
        fetch(`http://localhost:4000/api/characters/${params.id}/films`)
          .then((res) => res.json())
          .then((films) => setFilms(films))
      );
  }, [params]);

  useEffect(() => {
    if (character.homeworld) {
      fetch(`http://localhost:4000/api/planets/${character.homeworld}`)
        .then((res) => res.json())
        .then((planet) => setPlanet(planet));
    }
  }, [character]);

  const handleClickFilm = (id) => {
    navigate(`/films/${id}`);
  };

  const handleClickPlanet = (id) => {
    navigate(`/planets/${id}`);
  };

  return (
    <>
      <h1 id="name">{character.name}</h1>
      <section id="generalInfo">
        <p>
          Height: <span id="height"></span>
          {character.height} cm
        </p>
        <p>
          Mass: <span id="mass"></span>
          {character.mass} kg
        </p>
        <p>
          Born: <span id="birth_year"></span>
          {character.birth_year}
        </p>
      </section>
      <section id="planets">
        <h2>Homeworld</h2>
        <p>
          <li id="homeworld" onClick={(e) => handleClickPlanet(planet.id)}>
            {planet.name}
          </li>
        </p>
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

export default CharacterPage;
