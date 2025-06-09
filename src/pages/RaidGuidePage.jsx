import { useState } from 'react';
import raidData from '../data/raid_guide.json';

const RaidGuidePage = () => {
  const [selectedBoss, setSelectedBoss] = useState(null);

  const renderHeroes = (title, members) => (
    <div className="mb-4">
      <p className="font-semibold text-sm text-gray-600 mb-1">{title}</p>
      <div className="flex flex-wrap gap-2">
        {members.map((hero, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center w-20 text-center"
          >
            <img
              src={`/images/heroes/${hero.image}`}
              alt={hero.name}
              className="w- h-24 rounded object-contain border"
            />
            <span className="text-xs mt-1 text-gray-700">{hero.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBossDetail = (boss) => (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{boss.name} 공략</h2>
     
      <p className="text-gray-700 mb-2">{boss.dropInfo}</p>

      <div className="space-y-2">
        {Object.entries(boss.team).map(([role, members], i) =>
          renderHeroes(role, members)
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800 mb-2">🛠 템셋팅</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
  {Object.entries(boss.equipment || {}).map(([target, equip], idx) => (
    <li key={idx}>
      <strong>{target}</strong>:
      <div className="ml-2 mt-1">
        {Array.isArray(equip) && typeof equip[0] === 'object' ? (
         <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">

            {equip.map((e, i) => (
              <li key={i}>
                <span className="font-medium">{e.세트}</span>: {e.옵션}
              </li>
            ))}
          </ul>
        ) : (
          <span className="ml-1">{equip.join(', ')}</span>
        )}
      </div>
    </li>
  ))}
</ul>

      </div>

      {boss.skillOrder && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 mb-2">🌀 스킬 순서</h3>
          {boss.seianUsage && (
  <div className="mt-4">

    <ul className="list-disc list-inside text-sm text-gray-700">
      {boss.seianUsage.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  </div>
)}

          
        </div>
      )}

      {boss.notes && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 mb-2">📌 참고 사항</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {boss.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">⚔️ 레이드 공략</h1>

        {/* 보스 목록 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(raidData).map(([key, boss]) => (
           <div
  key={key}
  onClick={() => setSelectedBoss(boss)}
  className="cursor-pointer text-center p-4 border rounded-lg hover:shadow transition flex flex-col items-center"
>
  <div className="w-full aspect-square mb-2">
    <img
      src={`/images/boss/${boss.image}`}
      alt={boss.name}
      className="w-full h-64 object-contain"
    />
  </div>
  
</div>

          ))}
        </div>

        {/* 보스 공략 상세 */}
        {selectedBoss && renderBossDetail(selectedBoss)}
      </div>
    </div>
  );
};

export default RaidGuidePage;
