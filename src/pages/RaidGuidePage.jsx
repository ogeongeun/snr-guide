import { useNavigate } from 'react-router-dom';
import raidData from '../data/raid_guide.json';

const RaidGuidePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">⚔️ 레이드 공략</h1>

        {/* 보스 목록 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(raidData).map(([key, boss]) => (
            <div
              key={key}
              onClick={() => navigate(`/raid-guide/${key}`)} // 👉 클릭 시 페이지 이동
              className="cursor-pointer text-center p-4 border rounded-lg hover:shadow transition flex flex-col items-center"
            >
              <div className="w-full aspect-square mb-2">
                <img
                  src={`/images/boss/${boss.image}`}
                  alt={boss.name}
                  className="w-full h-64 object-contain"
                />
              </div>
              <p className="text-sm font-semibold text-gray-700">{boss.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RaidGuidePage;
