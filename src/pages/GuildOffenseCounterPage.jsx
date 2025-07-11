import React from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/guildCounter.json';

export default function GuildOffenseListPage() {
  const navigate = useNavigate();

  const renderHeroCard = (hero) => (
    <div
      key={hero.name}
      className="flex flex-col items-center bg-white border rounded-lg p-1 shadow-sm"
    >
      <div className="w-14 h-14 flex items-center justify-center">
        <img
          src={hero.image}
          alt={hero.name}
          className="w-14 h-14 object-contain block"
        />
      </div>
      <p className="text-[10px] mt-1 mb-0 text-center">{hero.name}</p>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">공격팀 추천</h1>
      <p className="text-sm font-semibold text-red-500 mb-4">
        상대 방어팀을 클릭하세요! 추천 카운터 팀 페이지로 이동합니다.
      </p>

      {data.teams.map((entry, idx) => (
        <button
          key={idx}
          onClick={() => navigate(`/guild-offense-detail/${idx}`)}
          className="w-full mb-6 border rounded-xl p-4 shadow bg-white text-left"
        >
         
          <h2 className="text-xl font-semibold mb-2">상대 방어팀 #{idx + 1}</h2>
 {/* 덱 이름(label) 표시 */}
          {entry.label && (
            <p className="text-sm font-medium text-red-600 mb-1"> {entry.label}</p>
          )}

          <div className="grid grid-cols-3 gap-2">
            {entry.defenseTeam.map(renderHeroCard)}
          </div>
        </button>
      ))}
    </div>
  );
}
