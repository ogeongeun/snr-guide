import React, { useState, useEffect } from 'react';
import equipmentData from '../data/equipmentRecommend.json';

const EquipmentRecommendPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHeroKey, setSelectedHeroKey] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);

  const heroEntries = Object.entries(equipmentData).filter(([_, hero]) =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedHero = selectedHeroKey ? equipmentData[selectedHeroKey] : null;
  const roleKeys = selectedHero ? Object.keys(selectedHero.roles) : [];
  const stageKeys =
    selectedHero && selectedRole
      ? Object.keys(selectedHero.roles[selectedRole] || {})
      : [];

  // 역할 자동 선택
  useEffect(() => {
    if (selectedHero && roleKeys.length === 1) {
      setSelectedRole(roleKeys[0]);
    }
  }, [selectedHero, roleKeys]);

  // 초월 단계 자동 선택
  useEffect(() => {
    if (selectedRole && stageKeys.length === 1) {
      setSelectedStage(stageKeys[0]);
    }
  }, [selectedRole, stageKeys]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">🛡️ 장비 추천</h1>

      <input
        type="text"
        placeholder="영웅 이름 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-6 border rounded-lg shadow"
      />

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6">
        {heroEntries.map(([key, hero]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedHeroKey(key);
              setSelectedRole(null);
              setSelectedStage(null);
            }}
            className="flex flex-col items-center border rounded-lg p-2 bg-white hover:shadow"
          >
            <img
              src={hero.image}
              alt={hero.name}
              className="w-16 h-16 object-contain"
            />
            <p className="text-xs mt-1 text-center">{hero.name}</p>
          </button>
        ))}
      </div>

      {/* 역할 선택 */}
      {selectedHero && roleKeys.length > 1 && (
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold mb-2">역할 선택</h2>
          <div className="flex justify-center flex-wrap gap-3">
            {roleKeys.map((role) => (
              <button
                key={role}
                onClick={() => {
                  setSelectedRole(role);
                  setSelectedStage(null);
                }}
                className={`px-4 py-1 rounded-full border shadow text-sm transition ${
                  selectedRole === role
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 초월 단계 선택 */}
      {selectedHero && selectedRole && stageKeys.length > 1 && (
        <div className="mb-4 text-center">
          <h2 className="text-md font-medium mb-2">초월 단계 선택</h2>
          <div className="flex justify-center flex-wrap gap-2">
            {stageKeys.map((stage) => (
              <button
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  selectedStage === stage
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 장비 세팅 출력 */}
      {selectedHero && selectedRole && selectedStage && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-center mb-4">
            {selectedHero.name} ({selectedRole}, {selectedStage}) 장비 세팅
          </h3>

          {selectedHero.roles[selectedRole][selectedStage].map((build, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm mb-4"
            >
              <p className="font-semibold text-sm">세트: {build.set}</p>
              <p className="text-sm mt-1">주 옵션: {build.mainOption}</p>
              {build.note && (
                <p className="text-xs text-gray-500 mt-2 italic">💬 {build.note}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentRecommendPage;
