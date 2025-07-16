import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../data/guildCounter.json';

export default function GuildOffenseListPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('공덱');

  const categories = Object.keys(data.categories);

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

      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-sm text-gray-800 mb-8">
        <p className="font-semibold mb-1">공격팀 구성 팁</p>
        <ul className="list-disc list-inside leading-relaxed">
          <li>공격하기전에 리플레이로 상대 속공,스킬순서 파악하기</li>
          <li>한번 사용한 영웅 재사용 안됨(신중히 배치)</li>
          <li>상대 속공이길수있으면 걍 미러전 하면됨(면역캐 안넣어도됨)</li>
          <li>힐러는 상대 방덱아니면 굳이 넣지않기</li>
          <li className="text-red-500">도전하고 지면 공지방 구글 스프레드시트에 꼭 정보 작성</li>
          <li className="text-red-500">도전할 때 구글 스프레드시트 정보보고 공격</li>
        </ul>
      </div>

      {/* 카테고리 탭 */}
      <div className="flex gap-2 mb-6 justify-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-sm font-semibold text-red-500 mb-4">
        상대 방어팀을 클릭하세요! 추천 카운터 팀 페이지로 이동합니다.
      </p>

      {data.categories[selectedCategory].map((entry, idx) => (
        <button
          key={idx}
          onClick={() => navigate(`/guild-offense-detail/${selectedCategory}/${idx}`)}
          className="w-full mb-6 border rounded-xl p-4 shadow bg-white text-left"
        >
          <h2 className="text-xl font-semibold mb-2">
            [{selectedCategory}] #{idx + 1} {entry.label}
          </h2>

          <div className="grid grid-cols-3 gap-2">
            {entry.defenseTeam.map(renderHeroCard)}
          </div>
        </button>
      ))}
    </div>
  );
}
