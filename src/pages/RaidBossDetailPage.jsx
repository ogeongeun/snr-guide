import { useParams, useNavigate } from 'react-router-dom';
import raidData from '../data/raid_guide.json';

const RaidBossDetailPage = () => {
  const { bossId } = useParams();
  const navigate = useNavigate();
  const boss = raidData[bossId];

  if (!boss) {
    return <div className="text-center py-10 text-gray-600">해당 보스 정보를 찾을 수 없습니다.</div>;
  }

  const renderHeroes = (title, members) => (
    <div className="mb-4">
      <p className="font-semibold text-sm text-gray-600 mb-1">{title}</p>
      <div className="flex flex-wrap gap-2">
        {members.map((hero, idx) => (
          <div key={idx} className="flex flex-col items-center w-20 text-center">
            <img
              src={`/images/heroes/${hero.image}`}
              alt={hero.name}
              className="w-24 h-24 rounded object-contain border"
            />
            <span className="text-xs mt-1 text-gray-700">{hero.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <button onClick={() => navigate(-1)} className="mb-4 text-sm text-blue-600 hover:underline">
          ← 뒤로가기
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">{boss.name} 공략 ⭐</h1>
       
        <p className="text-sm text-gray-600 mb-4">{boss.dropInfo}</p>

        <div className="space-y-2">
          {Object.entries(boss.team).map(([role, members]) => renderHeroes(role, members))}
        </div>

        <div className="mt-6">
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

        
        {boss.seianUsage && (
          <div className="mt-6">
           <h3 className="font-semibold text-gray-800 mb-2">🌀 스킬 순서</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {boss.seianUsage.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {boss.notes && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">📌 참고 사항</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {boss.notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaidBossDetailPage;
