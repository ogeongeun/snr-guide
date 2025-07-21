import { useState } from 'react';
import guildData from '../data/guild_defense_recommendations.json';

export default function GuildDefenseBuildPage() {
  const [selectedCategory, setSelectedCategory] = useState('공덱');

  const renderHeroes = (heroes) => (
    <div
      className={`grid gap-2 mt-3 ${
        heroes.length === 3 ? 'grid-cols-3 justify-center' : 'grid-cols-5'
      }`}
    >
      {heroes.map((hero, idx) => {
        const imagePath = hero.image?.startsWith('/images/')
          ? hero.image
          : `/images/heroes/${hero.image}`;

        return (
          <div
            key={idx}
            className="flex flex-col items-center bg-white border rounded-lg p-1 shadow-sm"
          >
            <img
              src={imagePath}
              alt={hero.name}
              className="w-14 h-14 object-contain"
            />
            {hero.note ? (
              <p className="text-[9px] text-red-500 italic mt-0.5 text-center">
                {hero.note}
              </p>
            ) : (
              <div className="h-[14px]" />
            )}
            <p className="text-[10px] mt-1 text-center">{hero.name}</p>
          </div>
        );
      })}
    </div>
  );

  const renderSkillOrder = (skillOrder) => (
    <div className="mt-3">
      <p className="text-xs font-semibold text-gray-600 mb-1">스킬 순서</p>
      <div className="flex flex-wrap gap-2">
        {skillOrder.map((img, idx) => (
          <img
            key={idx}
            src={`/images/skills/${img}`}
            alt={`Skill ${idx + 1}`}
            className="w-10 h-10 border rounded"
          />
        ))}
      </div>
    </div>
  );

  const categoryNames = Object.keys(guildData.categories);
  const currentCategory = guildData.categories[selectedCategory];
  const selectedTeams = currentCategory?.teams || [];
  const categoryDesc = currentCategory?.desc || '';

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🛡️ 방어팀 필수 조합
        </h1>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-sm text-gray-800 mb-8">
          <p className="font-semibold mb-1">방어팀 구성 팁</p>
          <ul className="list-disc list-inside leading-relaxed">
            <li>5편성 영웅 부족시: 가장쎈 팀 1,2,3팀 편성 나머지 2팀 약팀 구성</li>
            <li>메인 딜러 한명</li>
            <li>공덱 3개는 속공 높에 몰빵</li>
            <li>스킬 순서: cc1-cc2-메인딜러 딜</li>
             <li>영웅 모두 5성~6성 cc반지 껴주기</li>
            <li>방덱은 속공 낯추고 체급 높이기</li>
            <li>즉사 방덱은 구성x</li>
          </ul>
        </div>

        {/* 카테고리 선택 탭 */}
        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          {categoryNames.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border text-sm ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 선택된 카테고리 설명 */}
        {categoryDesc && (
  <div className="text-sm text-dark-600 italic mb-4 text-center whitespace-pre-line">
    ※ {categoryDesc}
  </div>
)}


        {/* 팀 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {selectedTeams.map((team, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-700 mb-2">
                {team.name || `팀 ${index + 1}`}
              </p>
              {team.note && (
                <p className="text-[11px] text-red-500 mt-1 italic">※ {team.note}</p>
              )}
              {renderHeroes(team.heroes)}
              {team.skillOrder && renderSkillOrder(team.skillOrder)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
