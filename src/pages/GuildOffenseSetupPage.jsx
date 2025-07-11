import React, { useState } from 'react';
import offenseData from '../data/guildOffense.json';
// Chevron 아이콘은 제거 (lucide-react 없이)
const GuildOffenseSetupPage = () => {
  const { members, teams } = offenseData;
  const [openMember, setOpenMember] = useState(null);
  const [search, setSearch] = useState(''); // 검색 상태

  const handleClick = (name) => {
    setOpenMember((prev) => (prev === name ? null : name));
  };

  // 검색어로 필터링
  const filteredMembers = members.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🗡️ 공격팀 편성</h1>
      <p className="text-center text-sm text-red-600 mb-4">내 이름을 클릭하여 편성을 확인하세요.</p>

      {/* 검색 입력창 */}
      <input
        type="text"
        placeholder="이름 검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full mb-5 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />

      <div className="space-y-3">
        {filteredMembers.map((memberName) => {
          const isOpen = openMember === memberName;
          return (
            <div
              key={memberName}
              className="bg-white border border-gray-300 rounded-xl shadow hover:shadow-md transition-all"
            >
              <button
                onClick={() => handleClick(memberName)}
                className={`w-full flex items-center justify-between px-4 py-3 font-semibold rounded-t-xl text-sm transition-colors
                  ${isOpen ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-50'}
                `}
              >
                <span>{memberName}</span>
                <span>{isOpen ? '▼' : '▶'}</span>
              </button>

              {isOpen && (
                <div className="p-4 border-t border-gray-200 space-y-4 bg-gray-50 rounded-b-xl">
                  {teams[memberName]?.map((team, idx) => (
                    <div
                      key={idx}
                      className="border border-purple-300 rounded-lg p-3 bg-white shadow-sm"
                    >
                      <h3 className="text-sm font-semibold text-purple-700 mb-2">팀 {idx + 1}</h3>

                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {team.map((hero, i) => {
                          const heroName = typeof hero === 'string' ? hero : hero.name;
                          const heroImage =
                            typeof hero === 'string'
                              ? `/images/heroes/${hero}.png`
                              : hero.image;
                          const heroNote = typeof hero === 'object' ? hero.note : null;

                          return (
                            <div
                              key={i}
                              className="flex flex-col items-center bg-gray-50 border rounded-lg p-2 shadow-sm"
                            >
                              <img
                                src={heroImage}
                                alt={heroName}
                                className="w-14 h-14 object-contain"
                              />
                              <p className="text-[11px] mt-1 text-center">{heroName}</p>
                              {heroNote && (
                                <div className="text-xs text-red-500 italic mt-0.5">
                                  {heroNote}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-400 italic text-sm mt-2">팀 정보 없음</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filteredMembers.length === 0 && (
          <p className="text-center text-gray-400 italic mt-10">일치하는 길드원이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default GuildOffenseSetupPage;
