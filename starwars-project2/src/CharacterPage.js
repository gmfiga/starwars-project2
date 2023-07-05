import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CharacterPage = () => {

    const [character, setCharacter] = useState({});
    let params = useParams();

    useEffect(() => {
        //fetch
        fetch(`http://localhost:4000/api/characters/${params.id}`)
        .then(res => res.json())
        .then(char => setCharacter(char));
    }, []);

  return (
    <>
        <h1 id="name">{character.name}</h1>
        <section id="generalInfo">
        <p>Height: <span id="height"></span>{character.height} cm</p>
        <p>Mass: <span id="mass"></span>{character.mass} kg</p>
        <p>Born: <span id="birth_year"></span>{character.birth_year}</p>
        </section>
        <section id="planets">
        <h2>Homeworld</h2>
            <p><span id="homeworld">{character.homeworld}</span></p>
        </section>
        <section id="films">
            <h2>Films appeared in</h2>
            <ul></ul>
        </section>
    </>
  )
}

export default CharacterPage