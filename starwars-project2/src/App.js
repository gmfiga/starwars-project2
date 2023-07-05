import './App.css';
import Character from './Character';

import {Routes, Route} from 'react-router-dom';
import CharacterPage from './CharacterPage';
import Home from './Home';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:id" element={<CharacterPage />} />
      </Routes>
    </div>
  );
}

export default App;
