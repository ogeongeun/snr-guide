import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FarmingEfficiency from './pages/FarmingEfficiency';
import EssentialHeroesPage from './pages/EssentialHeroesPage';
import RaidGuidePage from './pages/RaidGuidePage';
import RaidBossDetailPage from './pages/RaidBossDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farming" element={<FarmingEfficiency />} />
        <Route path="/essential-heroes" element={<EssentialHeroesPage />} />
        <Route path="/raid-guide" element={<RaidGuidePage />} />
        <Route path="/raid-guide/:bossId" element={<RaidBossDetailPage />} />

      </Routes>
    </Router>
  );
};

export default App;
