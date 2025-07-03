import { useParams } from 'react-router-dom';
import data from '../data/adventure_teams.json';

const AdventureDetailPage = () => {
  const { stage } = useParams();
  const stageData = data[stage];

  if (!stageData) {
    return <div className="p-6">해당 스테이지 정보를 찾을 수 없습니다.</div>;
  }

  const renderHeroes = (heroes) => (
    <div className="grid grid-cols-5 gap-2 mt-2">
      {heroes.map((hero, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white border rounded-lg p-1 shadow-sm"
        >
          <img
            src={hero.image}
            alt={hero.name}
            className="w-14 h-14 object-contain"
          />
          <p className="text-[10px] mt-1 text-center">{hero.name}</p>
          {hero.subText && (
            <p className="text-[10px] text-red-500 font-semibold mt-0.5">
              {hero.subText}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🗺️ {stage} 모험 덱</h1>
        

        {Object.entries(stageData).map(([mainTeamKey, subTeams], i) => (
          <div
            key={mainTeamKey}
            className="mb-8 bg-gray-100 border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-purple-700 mb-3">팀 {i + 1}</h2>

            {Object.entries(subTeams).map(([subKey, subTeam], j) => (
              <div key={subKey} className="mb-4">
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  서브팀 {j + 1}
                </p>
                {subTeam.description && (
                  <p className="text-xs text-gray-500 italic mb-1">
                    {subTeam.description}
                  </p>
                )}
                {renderHeroes(subTeam.heroes)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdventureDetailPage;
