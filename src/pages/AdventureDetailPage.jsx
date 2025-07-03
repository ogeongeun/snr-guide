import { useParams } from 'react-router-dom';
import data from '../data/adventure_teams.json';

const AdventureDetailPage = () => {
  const { stage } = useParams();
  const stageData = data[stage];

  if (!stageData) {
    return <div className="p-6">해당 스테이지 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{stage} 추천 덱</h2>

      {["team1", "team2"].map((teamKey, i) => (
        <div key={teamKey} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">팀 {i + 1}</h3>
          <div className="grid grid-cols-3 gap-4">
            {stageData[teamKey].map((hero, idx) => (
              <div key={idx} className="text-center">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="w-24 h-24 mx-auto rounded-lg shadow"
                />
                <p className="mt-1 text-sm">{hero.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdventureDetailPage;
