import { useParams } from 'react-router-dom';
import data from '../data/guildCounter.json';

export default function GuildOffenseDetailPage() {
  const { index } = useParams();
  const entry = data.teams[parseInt(index)];

  const renderHeroCard = (hero) => (
    <div
      key={hero.name}
      className="flex flex-col items-center bg-white border rounded-lg p-1 shadow-sm "
    >
      <div className="w-14 h-14 flex items-center justify-center">
        <img
          src={hero.image}
          alt={hero.name}
          className="w-14 h-14 object-contain"
        />
      </div>
      <p className="text-[10px] mt-1 text-center">{hero.name}</p>
      {hero.note && (
        <p className="text-[9px] text-red-500 italic mt-[2px] text-center">
          {hero.note}
        </p>
      )}
    </div>
  );

  const renderSkillOrder = (skillOrder) => (
    <div className="mt-3">
      <p className="text-sm font-semibold mb-2 text-gray-700">스킬 순서</p>
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">추천 카운터팀</h1>

      <h3 className="text-lg font-semibold mt-6 mb-4">추천 카운터팀 목록</h3>

      {entry.recommendedCounters.map((counter, j) => (
        <div
          key={j}
          className="mb-6 border border-gray-300 rounded-xl p-4 bg-white shadow-md"
        >
          <div className="grid grid-cols-3 gap-2">{counter.team.map(renderHeroCard)}</div>

          {counter.note && (
            <p className="text-sm text-gray-600 mt-2 italic">{counter.note}</p>
          )}

          {/* 항상 스킬 순서 출력 */}
          {counter.skillOrder && renderSkillOrder(counter.skillOrder)}
        </div>
      ))}
    </div>
  );
}
