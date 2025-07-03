import { useParams, Link } from 'react-router-dom';
import data from '../data/infinity_tower_teams.json';

const InfinityTowerDetailPage = () => {
  const { floor } = useParams();
  const decodedFloor = decodeURIComponent(floor);
  const towerData = data[decodedFloor];

  if (!towerData || !towerData.teams) {
    return <div className="p-6 text-center text-red-600">해당 층의 팀 정보가 없습니다.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">🏯 {decodedFloor}</h1>

      <div className="space-y-6">
        {towerData.teams.map((team, idx) => (
          <Link
            to={`/infinity-skill/${encodeURIComponent(decodedFloor)}/${idx}`}  // ⬅️ 팀 번호 포함
            key={idx}
            className="block border border-purple-300 bg-white rounded-xl shadow hover:shadow-md transition duration-200 p-4"
          >
            <h2 className="text-lg font-semibold text-purple-700 mb-2">팀 {idx + 1}</h2>
            <p className="text-sm italic text-gray-600 mb-3">{team.description}</p>

            <div className="grid grid-cols-5 gap-2">
              {team.heroes.map((hero, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-gray-50 border rounded-lg p-1 shadow-sm"
                >
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-14 h-14 object-contain"
                  />
                  <p className="text-[10px] mt-1 text-center">{hero.name}</p>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InfinityTowerDetailPage;
