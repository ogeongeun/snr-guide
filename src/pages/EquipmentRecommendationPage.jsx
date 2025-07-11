import React, { useEffect, useMemo, useState } from "react";
import equipmentData from "../data/equipmentRecommend.json";

const EquipmentRecommendationPage = () => {
  const [selectedRoleFilter, setSelectedRoleFilter] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);

  const filteredHeroes = useMemo(() => {
    if (!selectedRoleFilter) return Object.entries(equipmentData);
    return Object.entries(equipmentData).filter(([_, hero]) =>
      Object.keys(hero.roles).includes(selectedRoleFilter)
    );
  }, [selectedRoleFilter]);

  useEffect(() => {
    if (filteredHeroes.length > 0) {
      setSelectedHero(filteredHeroes[0][0]);
    }
  }, [filteredHeroes]);

  const hero = selectedHero ? equipmentData[selectedHero] : null;

  const roleKeys = useMemo(() => {
    return hero ? Object.keys(hero.roles || {}) : [];
  }, [hero]);

  const stageKeys = useMemo(() => {
    const selected = hero?.roles?.[selectedRole];
    if (!selected) return [];
    return Object.keys(selected);
  }, [hero, selectedRole]);

  useEffect(() => {
    if (!selectedRole && roleKeys.length > 0) {
      setSelectedRole(roleKeys[0]);
    }
  }, [roleKeys, selectedRole]);

  useEffect(() => {
    if (!selectedStage && stageKeys.length > 0) {
      setSelectedStage(stageKeys[0]);
    }
  }, [stageKeys, selectedStage]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">장비 추천</h1>

      <div className="mb-4 flex gap-2">
        {["딜러", "서포터", "탱커"].map((role) => (
          <button
            key={role}
            className={`px-3 py-1 rounded ${
              selectedRoleFilter === role
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              setSelectedRoleFilter(role);
              setSelectedRole(null);
              setSelectedStage(null);
            }}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredHeroes.map(([key, hero]) => (
          <div
            key={key}
            className={`p-2 border rounded cursor-pointer ${
              selectedHero === key ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => {
              setSelectedHero(key);
              setSelectedRole(null);
              setSelectedStage(null);
            }}
          >
            <img src={hero.image} alt={hero.name} className="w-full" />
            <p className="text-center mt-2 text-sm">{hero.name}</p>
          </div>
        ))}
      </div>

      {hero && selectedRole && selectedStage && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">{hero.name} - {selectedRole}</h2>

          <div className="mb-4 flex gap-2">
            {roleKeys.map((role) => (
              <button
                key={role}
                className={`px-3 py-1 rounded ${
                  selectedRole === role
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  setSelectedRole(role);
                  setSelectedStage(null);
                }}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="mb-4 flex gap-2">
            {stageKeys.map((stage) => (
              <button
                key={stage}
                className={`px-3 py-1 rounded ${
                  selectedStage === stage
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedStage(stage)}
              >
                {stage}
              </button>
            ))}
          </div>

          <div className="border p-4 rounded bg-gray-50">
            <p><strong>세트:</strong> {hero.roles[selectedRole][selectedStage].set}</p>
            <p><strong>주 옵션:</strong> {hero.roles[selectedRole][selectedStage].mainOption}</p>
            <p><strong>비고:</strong> {hero.roles[selectedRole][selectedStage].note}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentRecommendationPage;
