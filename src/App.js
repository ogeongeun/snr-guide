import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FarmingEfficiency from './pages/FarmingEfficiency';
import EssentialHeroesPage from './pages/EssentialHeroesPage';
import RaidGuidePage from './pages/RaidGuidePage';
import SiegePage from './pages/SiegePage';
import SiegeSkillDetailPage from './pages/SiegeSkillDetailPage';
import SkillOrderPage from './pages/SkillOrderPage';
import RaidSkillDetailPage from './pages/RaidSkillDetailPage';
import AdventureDetailPage from './pages/AdventureDetailPage';
import Adventure from './pages/Adventure';
import InfinityTowerDetailPage from './pages/InfinityTowerDetailPage';
import InfinityTowerPage from './pages/InfinityTowerPage';
import InfinitySkillDetailPage from './pages/InfinitySkillDetailPage';
import TrialSkillDetailPage from './pages/TrialSkillDetailPage';
import TrialTowerDetailPage from './pages/TrialTowerDetailPage';
import TrialTowerPage from './pages/TrialTowerPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farming" element={<FarmingEfficiency />} />
        <Route path="/essential-heroes" element={<EssentialHeroesPage />} />
        <Route path="/raid-skill/:bossKey/:teamIndex" element={<RaidSkillDetailPage />} />
        <Route path="/siege" element={<SiegePage />} />
        <Route path="/siege-skill/:day/:teamIndex" element={<SiegeSkillDetailPage />} />
        <Route path="/skill-order" element={<SkillOrderPage />} />
        <Route path="/raid-guide" element={<RaidGuidePage/>} />
        <Route path="/adventure" element={<Adventure/>} />
        <Route path="/adventure/:stage" element={<AdventureDetailPage />} />
       <Route path="/infinity-tower" element={<InfinityTowerPage />} />
       <Route path="/infinity-tower/:floor" element={<InfinityTowerDetailPage />} />
        <Route path="/infinity-skill/:floor/:teamIndex" element={<InfinitySkillDetailPage />} />
        <Route path="/trial-tower" element={<TrialTowerPage />} />
<Route path="/trial-tower/:floor" element={<TrialTowerDetailPage />} />
<Route path="/trial-skill/:floor/:teamIndex" element={<TrialSkillDetailPage />} />


      </Routes>
    </Router>
  );
};

export default App;
