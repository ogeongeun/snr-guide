import { useParams } from 'react-router-dom';
import data from '../data/infinity_tower_teams.json';

const InfinityTowerDetailPage = () => {
  const { floor } = useParams();
  const teamData = data[decodeURIComponent(floor)];

  if (!teamData) {
    return <div className="p-6">해당 층 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🏯 {floor}</h1>
      <p className="text-sm italic text-gray-600 mb-4">{teamData.description}</p>

      <div className="grid grid-cols-5 gap-2">
        {teamData.heroes.map((hero, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white border rounded-lg p-1 shadow-sm">
            <img src={hero.image} alt={hero.name} className="w-14 h-14 object-contain" />
            <p className="text-[10px] mt-1 text-center">{hero.name}</p>
            {hero.subText && (
              <p className="text-[10px] text-red-500 font-semibold mt-0.5">
                {hero.subText}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfinityTowerDetailPage;
