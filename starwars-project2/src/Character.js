import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Character = (props) => {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/characters/${id}`);
  }

   return (
    <div className="character" onClick={(e) => handleClick(props.id)}>{props.name}</div>
  )
}

export default Character