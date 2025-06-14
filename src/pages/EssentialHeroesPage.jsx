import { useState } from 'react';
import data from '../data/essential-heroes.json';
import siegeSkills from '../data/siege-skills.json';

const EssentialHeroesPage = () => {
  const { bossCounters, elementalEffects, siegeCounters } = data || {};
  const [tab, setTab] = useState('boss');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subTab, setSubTab] = useState('heroes');

  const getDataMap = () => {
    if (tab === 'boss') return bossCounters || {};
    if (tab === 'elemental') return elementalEffects || {};
    if (tab === 'siege') return siegeCounters || {};
    return {};
  };

  const currentData = getDataMap();

  const renderHeroes = (heroes) => {
    if (!Array.isArray(heroes)) return null;

    return (
      <div className="flex flex-wrap gap-4 mt-4">
        {heroes.map((hero, idx) =>
          typeof hero === 'string' && hero.startsWith('description') ? (
            <p key={idx} className="text-sm italic text-gray-500 col-span-full">
              ※ {hero.replace('description :', '').trim()}
            </p>
          ) : (
            <div
              key={idx}
              className="flex items-center justify-center bg-white border rounded-lg p-2 shadow-sm w-24 h-24"
            >
              <img
                src={`/images/heroes/${hero.image}`}
                alt={hero.name}
                className="w-24 h-24 object-contain"
              />
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📋 필수 육성 영웅</h1>

        {/* 탭 선택 */}
        <div className="flex justify-center mb-6 space-x-4">
          {[
            { key: 'boss', label: '🛡 보스별', color: 'blue' },
            { key: 'elemental', label: '🌈 요일별', color: 'green' },
            { key: 'siege', label: '🏰 공성전', color: 'purple' },
          ].map(({ key, label, color }) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                tab === key ? `bg-${color}-500 text-white` : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => {
                setTab(key);
                setSelectedCategory(null);
                setSubTab('heroes');
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 카테고리 목록 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(currentData).map(([category]) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSubTab('heroes');
              }}
              className={`text-sm px-3 py-2 rounded border text-gray-800 bg-white hover:bg-gray-100 transition ${
                selectedCategory === category ? 'ring-2 ring-blue-400' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 서브 탭 (공성전일 때만) */}
        {tab === 'siege' && selectedCategory && (
          <div className="flex justify-center mb-4 gap-4">
            <button
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                subTab === 'heroes' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setSubTab('heroes')}
            >
              영웅
            </button>
            <button
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                subTab === 'skill' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setSubTab('skill')}
            >
              스킬순서 설명
            </button>
          </div>
        )}

        {/* 세부 내용 */}
        {selectedCategory && (
          <div className="mt-4">
            <h3 className="text-xl font-bold text-gray-700 mb-4">{selectedCategory}</h3>

            {/* 스킬순서 탭 */}
            {tab === 'siege' && subTab === 'skill' ? (
              <div className="space-y-6">
                {/* 스킬 리스트 */}
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {siegeSkills[selectedCategory]?.skills?.length > 0 ? (
                    siegeSkills[selectedCategory].skills.map((skill, idx) => (
                      <li key={idx} className="flex flex-col items-center text-center">
                        <img
                          src={`/images/skills/${skill.image}`}
                          alt={`Skill ${idx + 1}`}
                          className="w-32 h-32 object-contain mb-2"
                        />
                        <p className="text-base font-medium text-gray-800 leading-snug">
                          {skill.description}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm italic text-gray-500">스킬 정보 없음</p>
                  )}
                </ul>
              </div>
            ) : (
              // 영웅 출력 탭
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(currentData[selectedCategory]).map(([trait, heroes], i) =>
                  trait === '비고' ? (
                    <li key={i} className="col-span-full text-sm italic text-gray-500">※ {heroes}</li>
                  ) : (
                    <li key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="font-semibold text-gray-700 mb-2">{trait}</p>
                      {renderHeroes(heroes)}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EssentialHeroesPage;
