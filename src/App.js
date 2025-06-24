import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FarmingEfficiency from './pages/FarmingEfficiency';
import EssentialHeroesPage from './pages/EssentialHeroesPage';
import RaidGuidePage from './pages/RaidGuidePage';
import SiegePage from './pages/SiegePage';
import SiegeSkillDetailPage from './pages/SiegeSkillDetailPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farming" element={<FarmingEfficiency />} />
        <Route path="/essential-heroes" element={<EssentialHeroesPage />} />
        <Route path="/raid-guide" element={<RaidGuidePage />} />
        <Route path="/siege" element={<SiegePage />} />
        <Route path="/siege-skill/:day/:teamIndex" element={<SiegeSkillDetailPage />} />
       

      </Routes>
    </Router>
  );
};

export default App;
