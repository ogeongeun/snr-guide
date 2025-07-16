import { useParams, Link } from 'react-router-dom';
import data from '../data/trial_tower_teams.json';

const TrialTowerDetailPage = () => {
  const { floor } = useParams();
  const decodedFloor = decodeURIComponent(floor);

  const originalData = data[decodedFloor];
  const towerData = originalData || data["171층"];

  if (!towerData || !towerData.teams || !Array.isArray(towerData.teams)) {
    return (
      <div className="p-6 text-center text-red-600">
        해당 층의 팀 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">🔥 {decodedFloor}</h1>
      <p className="text-sm font-semibold text-center text-red-500 mb-4">
        팀을 클릭하세요! 스킬 순서 화면으로 이동합니다.
      </p>

      <div className="space-y-6">
        {towerData.teams.map((team, idx) => (
          <Link
            to={`/trial-skill/${encodeURIComponent(decodedFloor)}/${idx}`}
            key={idx}
            className="block border border-red-300 bg-white rounded-xl shadow hover:shadow-md transition duration-200 p-4"
          >
            <h2 className="text-lg font-semibold text-red-700 mb-2">팀 {idx + 1}</h2>

            {team.description && (
              <p className="text-sm italic text-gray-700 mb-1">{team.description}</p>
            )}

            {team.medal && (
              <p className="text-lg font-bold text-yellow-600 mb-3">
                🥇 {team.medal}메달
              </p>
            )}

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
                  {hero.note && (
                    <div className="text-xs text-red-500 italic mt-0.5">
                      {hero.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrialTowerDetailPage;
