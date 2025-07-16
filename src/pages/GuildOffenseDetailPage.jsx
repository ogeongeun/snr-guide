import { useParams } from 'react-router-dom';
import data from '../data/guildCounter.json';

export default function GuildOffenseDetailPage() {
  const { category, teamIndex } = useParams();
  const decodedCategory = decodeURIComponent(category); // 혹시 라우터에서 인코딩된 경우 대비
  const entry = data.categories[decodedCategory]?.[parseInt(teamIndex)];

  if (!entry) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-red-500 text-center text-lg mt-10">
          해당 팀 데이터를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  const renderHeroCard = (hero) => (
    <div
      key={hero.name}
      className="flex flex-col items-center bg-white border rounded-lg p-1 shadow-sm"
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

      {entry.recommendedCounters.map((recommended, j) => (
        <div
          key={j}
          className="mb-6 border border-gray-300 rounded-xl p-4 bg-white shadow-md"
        >
          <div className="grid grid-cols-3 gap-2">
            {recommended.team.map(renderHeroCard)}
          </div>

          {recommended.note && (
            <p className="text-sm text-gray-600 mt-2 italic">{recommended.note}</p>
          )}

          {recommended.skillOrder && renderSkillOrder(recommended.skillOrder)}
        </div>
      ))}
    </div>
  );
}
