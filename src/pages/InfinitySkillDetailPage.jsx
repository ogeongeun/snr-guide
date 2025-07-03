import { useParams } from 'react-router-dom';
import infinitySkills from '../data/infinity_tower_skills.json';

const InfinitySkillDetailPage = () => {
  const { floor, teamIndex } = useParams();

  const decodedFloor = decodeURIComponent(floor);
  const teamKey = parseInt(teamIndex)?.toString(); // "0", "1" 문자열로 변환

  const stageData = infinitySkills?.[decodedFloor]?.[teamKey];

  const stageTitles = ["1스테이지", "2스테이지", "3스테이지"];

  if (!stageData || typeof stageData !== 'object') {
    return (
      <div className="p-6 text-center text-red-600">
        ⚠️ 스킬 정보를 찾을 수 없습니다.
        <br />
        층: <strong>{decodedFloor}</strong>, 팀: <strong>{teamIndex}</strong>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🗼 {decodedFloor} - 팀 {parseInt(teamKey) + 1} 스킬 순서
        </h1>

        {stageTitles.map((title, idx) => {
          const images = stageData[title];

          return (
            <div key={idx} className="mb-8">
              <h2 className="text-lg font-semibold text-blue-600 mb-2 text-center">
                {title}
              </h2>

              <div className="flex flex-wrap justify-center gap-4">
                {images?.map((img, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <img
                      src={`/images/skills/${img}`}
                      alt={`Skill ${i + 1}`}
                      title={img}
                      className="w-12 h-12 object-contain border rounded-md"
                    />
                    <span className="text-xs mt-1 text-gray-500">#{i + 1}</span>
                  </div>
                ))}
              </div>

              {idx !== stageTitles.length - 1 && (
                <hr className="my-6 border-gray-300" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfinitySkillDetailPage;
