import { useState } from 'react';
import data from '../data/essential-heroes.json';

const EssentialHeroesPage = () => {
  const { bossCounters, elementalEffects, siegeCounters } = data || {};
  const [tab, setTab] = useState('boss');
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        {heroes.map((hero, idx) => {
          const image = typeof hero === 'string' ? `${hero}.png` : hero.image;

          return (
            <div
              key={idx}
              className="flex items-center justify-center bg-white border rounded-lg p-2 shadow-sm w-24 h-24"
            >
              <img
                src={`/images/heroes/${image}`}
                alt=""
                className="w-24 h-24 object-contain"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📋 필수 육성 영웅</h1>

        {/* 탭 선택 */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === 'boss' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => {
              setTab('boss');
              setSelectedCategory(null);
            }}
          >
            🛡 보스별
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === 'elemental' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => {
              setTab('elemental');
              setSelectedCategory(null);
            }}
          >
            🌈 요일별
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === 'siege' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => {
              setTab('siege');
              setSelectedCategory(null);
            }}
          >
            🏰 공성전
          </button>
        </div>

        {/* 카테고리 목록 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(currentData).map(([category, traits], idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm px-3 py-2 rounded border text-gray-800 bg-white hover:bg-gray-100 transition ${
                selectedCategory === category ? 'ring-2 ring-blue-400' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 세부 내용 */}
        {selectedCategory && (
          <div className="mt-4">
            <h3 className="text-xl font-bold text-gray-700 mb-4">{selectedCategory}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(currentData[selectedCategory]).map(([trait, heroes], i) =>
                trait === '비고' ? (
                  <li key={i} className="col-span-full text-sm italic text-gray-500">※ {heroes}</li>
                ) : (
                  <li
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                  >
                    <p className="font-semibold text-gray-700 mb-2">{trait}</p>
                    {renderHeroes(heroes)}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EssentialHeroesPage;
