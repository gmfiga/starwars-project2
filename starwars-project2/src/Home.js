import React from 'react'
import Character from './Character';
import { useState, useEffect } from 'react';

const Home = () => {
    const [characters, setCharacters] = useState([]);

  useEffect(() => {
    //fetch
    fetch("http://localhost:4000/api/characters")
    .then(res => res.json())
    .then(chars => setCharacters(chars));
  }, []);

  return (
    <>
    <div>
        <h1>Star Wars Universe Lookup</h1>
    </div>
    <div className="charactersList">
        {characters.map(character => {
          return <Character name={character.name} key={character.id} id={character.id}/>;
        })}
    </div>
    </>
  )
}

export default Home