import { useNavigate } from 'react-router-dom';
import raidTeamsData from '../data/raid_teams.json';

const RaidGuidePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">⚔️ 레이드 공략</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          🧙 팀을 클릭하면 스킬 순서가 표시됩니다.
        </p>

        {/* 보스별 팀 리스트 */}
        <div className="space-y-10">
          {Object.entries(raidTeamsData).map(([bossKey, teams]) => (
            <div key={bossKey}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">{bossKey}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {teams.map((team, teamIndex) => (
                  <button
                    key={teamIndex}
                    onClick={() => navigate(`/raid-skill/${bossKey}/${teamIndex}`)}
                    className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition"
                  >
                    <p className="font-semibold text-gray-800 mb-2">팀 {teamIndex + 1}</p>
                    <div className="flex flex-wrap gap-2">
                      {team.team.map((hero, idx) => (
                        <img
                          key={idx}
                          src={`/images/heroes/${hero.image}`}
                          alt={hero.name}
                          className="w-14 h-14 object-contain border rounded"
                          title={hero.name}
                        />
                      ))}
                    </div>
                     {team.note && (
  <p className="mt-2 text-xs text-gray-500">
    {team.note}
  </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RaidGuidePage;
