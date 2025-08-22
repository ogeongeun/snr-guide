import { useNavigate } from 'react-router-dom';
import raidTeamsData from '../data/raid_teams.json';

const RaidGuidePage = () => {
  const navigate = useNavigate();

  const goDetail = (bossKey, teamIndex) => {
    // 🚫 자동 스크롤 없음
    const encoded = encodeURIComponent(bossKey);
    navigate(`/raid-skill/${encoded}/${teamIndex}`);
  };

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
                    onClick={() => goDetail(bossKey, teamIndex)}
                    className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition text-left"
                  >
                    <p className="font-semibold text-gray-800 mb-3">팀 {teamIndex + 1}</p>

                    {/* 한 줄 고정 + 가로 스크롤(자동 이동 X) */}
                    <div className="-mx-1 overflow-x-auto">
                      <div className="inline-flex gap-3 px-1">
                        {team.team.map((hero, idx) => (
                           
          <div
            key={idx}
            className="flex flex-col items-center justify-start bg-white border rounded-lg p-1 shadow-sm h-[110px]"
          >
            <img
              src={`/images/heroes/${hero.image}`}
              alt={hero.name}
              className="w-14 h-14 object-contain"
            />
            <p className="text-[10px] mt-1 text-center">{hero.name}</p>
            {hero.note ? (
              <p className="text-[9px] text-red-500 text-center italic mt-0.5">
                {hero.note}
              </p>
            ) : (
              <div className="h-[14px]" /> // 빈 공간 확보용
            )}
          </div>
        )
                        )}
                      </div>
                    </div>

                    {/* 팀 전체 note */}
                    {team.note && (
                      <p className="mt-3 text-xs text-gray-600 leading-5">{team.note}</p>
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
