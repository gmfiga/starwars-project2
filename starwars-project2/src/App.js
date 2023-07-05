import "./App.css";

import { Routes, Route } from "react-router-dom";
import CharacterPage from "./CharacterPage";
import FilmPage from "./FilmPage";
import PlanetPage from "./PlanetPage";

import Home from "./Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:id" element={<CharacterPage />} />
        <Route path="/films/:id" element={<FilmPage />} />
        <Route path="/planets/:id" element={<PlanetPage />} />
      </Routes>
    </div>
  );
}

export default App;
