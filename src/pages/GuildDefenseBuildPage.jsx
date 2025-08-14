// src/pages/GuildDefenseBuildPage.jsx
import { useState, useMemo } from 'react';
import guildData from '../data/guild_defense_recommendations.json';

// ✅ 모듈 상수: 빈 배열 참조를 고정 (의존성에 논리식 쓰지 않기 위함)
const EMPTY_TEAMS = Object.freeze([]);

export default function GuildDefenseBuildPage() {
  const categoryNames = Object.keys(guildData.categories || {});
  const [selectedCategory, setSelectedCategory] = useState(categoryNames[0] || '공덱');
  const [openGroupName, setOpenGroupName] = useState(null);

  const currentCategory = guildData.categories[selectedCategory] || {};
  const categoryDesc = currentCategory.desc || '';

  // ✅ 의존성에 논리식( || [] )을 직접 쓰지 않고, 고정 참조 상수로 대체
  const teamsRef = Array.isArray(currentCategory.teams) ? currentCategory.teams : EMPTY_TEAMS;

  // 같은 name(덱명)끼리 묶기
  const groupedByName = useMemo(() => {
    const map = new Map();
    teamsRef.forEach((team) => {
      const key = team.name || '이름없음';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(team);
    });
    return map;
  }, [teamsRef]); // ✅ deps에 teamsRef(고정 참조)만 사용

  const renderHeroes = (heroes = []) => (
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
            key={`${hero.name}-${idx}`}
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

  const renderSkillOrder = (skillOrder = []) => (
    <div className="mt-3">
      <p className="text-xs font-semibold text-gray-600 mb-1">스킬 순서</p>
      <div className="flex flex-wrap gap-2">
        {skillOrder.map((img, idx) => (
          <img
            key={`${img}-${idx}`}
            src={`/images/skills/${img}`}
            alt={`Skill ${idx + 1}`}
            className="w-10 h-10 border rounded"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🛡️ 방어팀 필수 조합
        </h1>

        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-sm text-gray-800 mb-6">
          <p className="font-semibold mb-1">방어팀 구성 팁</p>
          <ul className="list-disc list-inside leading-relaxed">
            <li>5편성 영웅 부족시: 가장 센 팀 1·2·3팀 편성, 나머지 2팀 약팀 구성</li>
            <li>메인 딜러 한 명</li>
            <li>공덱 3개는 속공 높게 몰빵</li>
            <li>스킬 순서: cc1 → cc2 → 메인딜러 딜</li>
            <li>영웅 모두 5~6성 cc 반지</li>
            <li>방덱은 속공 낮추고 체급 높이기</li>
            <li>즉사 방덱은 구성 X</li>
          </ul>
        </div>

        {/* 카테고리 탭 */}
        <div className="flex gap-2 mb-4 justify-center flex-wrap">
          {categoryNames.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setOpenGroupName(null);
              }}
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

        {/* 카테고리 설명 */}
        {categoryDesc && (
          <div className="text-sm text-gray-700 italic mb-4 text-center whitespace-pre-line">
            ※ {categoryDesc}
          </div>
        )}

        {/* 이름(덱명) 아코디언 */}
        <div className="space-y-2">
          {Array.from(groupedByName.entries()).map(([groupName, groupTeams]) => (
            <div
              key={groupName}
              className="border border-gray-200 rounded-lg bg-gray-50"
            >
              <button
                className="w-full text-left px-3 py-2 font-semibold text-gray-700 hover:bg-gray-100 rounded-lg flex items-center justify-between"
                onClick={() => setOpenGroupName(openGroupName === groupName ? null : groupName)}
              >
                <span>{groupName}</span>
                <span className="text-xs text-gray-500">{groupTeams.length}개 덱</span>
              </button>

              {openGroupName === groupName && (
                <div className="p-3 border-t border-gray-200 space-y-3">
                  {groupTeams.map((team, idx) => (
                    <div
                      key={`${groupName}-${idx}`}
                      className="bg-white border border-gray-200 rounded-lg p-3"
                    >
                      {team.note && (
                        <p className="text-[11px] text-red-500 mb-2 italic">※ {team.note}</p>
                      )}
                      {renderHeroes(team.heroes)}
                      {team.skillOrder && renderSkillOrder(team.skillOrder)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
